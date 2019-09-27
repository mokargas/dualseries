import React, {Component, Fragment} from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import Select from 'react-select'
import styled from 'react-emotion'

import Filter from './Filter'

//Util function

const createTitle = (data) => data.reduce((acc, current, idx, src) => `${acc}${idx > 0 && idx < src.length ? ', and' : ''} ${current.name}`, '')

const checkForProp = (obj, prop) => prop in obj

const defaultOptions = {
  chart: {
    type: 'column'
  },

  plotOptions:{
    column:{
     stacking: 'normal'
    }
  },
  xAxis:[{
     crosshair: true
  }],
  yAxis: [{ 
    labels: {
      format: '{value}',
      style: {
        color: Highcharts.getOptions().colors[1]
      }
    },
    title: {
      text: 'Employment',
      style: {
        color: Highcharts.getOptions().colors[1]
      }
    }
  }],
   tooltip: {
    shared: true
  },
  legend: {
    layout: 'horizontal',
    align: 'center',
    verticalAlign: 'bottom',
    backgroundColor:
      Highcharts.defaultOptions.legend.backgroundColor || 'rgba(255,255,255,0.25)'
  },
}

//Comps
const Charts = styled.div`
  padding: 2rem 0;
`

const Debug = styled.div`
  color:red;
  padding: 1rem;
`

const Filters = styled.div`
  display: flex;                       
  flex-wrap: wrap;                    
  justify-content: space-between;
`

export default class App extends Component{ 
  
  constructor() {
    super();
    this.state = {
      stackType: 'column'
    };
  }
  
  
  getData(entity, parent){
    const {entities, selectedDatasets, selectedCategories, selectedTags, selectedYears, data: entityData} = this.props;
    const rawData = entities.map(item => {
      const {id} = item;
      
      const found = entityData.find(i=> i.id === id)
      const data = found ? found.data: []
      return {
        entityId: id,
        data,
      }
    }).map(datum=>{
      const {entityId, data} = datum
      

      return [
        ...data.filter(a=> selectedDatasets.includes(a.id)).map(item=>{
         const {id, data: categoryData} = item;
         const selected = selectedCategories.filter(i=> i.parent === id)[0].categories
         const data = selected.map( cat => categoryData.filter(o=>checkForProp(o, cat))).flat()
         
          return{
            ...item,
            data,
            entityId,
          }
        }),
      ]
  })
    
    
    //Flatten and filter awful nested values by year, tagset, and the entityid (x-axis in this case)
    const flatten = rawData.flat().filter(set => set.entityId === entity).map(datum=>{
      const {data, entityId, name} = datum;
      
      const filterNested = data.map(b => {
        const tagset = Object.values(b)[0]
        const filteredTags = tagset.map(item=>{
          const {tags, value} = item
          
          //This should come from the engaged "filter"
          const findType = tags.find(i => i[parent])
          const selectedYear = tags.find(d => d.Year).Year
          
          //Check that the tags in the tagset are part of the year tag we selected and the type tagset we selected
          const flattenedSelectedTags = selectedTags.reduce((a, c)=> a.concat(c.selected), [])
          const isValid = findType && flattenedSelectedTags.includes(findType[parent]) && selectedYears.length > 0 && selectedYears.includes(selectedYear)
          
          if(isValid) {
            return {
              value,
              tag: findType[parent]
            }
          } 
        })
        
        //Return filtered tags for insertion, removing undefined
        return filteredTags.filter(Boolean)
      })
      return {
        entityId,
        name,
        data: filterNested
      }
    })
    
    return flatten
  }
  
  //Generate data for a selected type (assumed "tags" for this example)
  generateData(type, entity){
    const {parent, tag} = type
    return this.getData(entity, parent).map(node=>node.data).map(n=>{
      return n.map(b=>{
        const k = b.filter(item=>item.tag === tag)
        return k.reduce((a, c) => a+(c.value !== null ? c.value: 0.0), 0.0)
      }).reduce((acc, curr)=>acc+curr, 0)
    }).reduce((acc, curr)=>acc+curr, 0)
  }
  
  //Compare each dataset's available tags, remove incompatible?
  getCommonTagset(){
    const {selectedDatasets, datasets} = this.props;
    const rawTagsets = selectedDatasets.map(id=>{
      return datasets.find(a=> Number(a.id) === id).tags
    })
    
    //Dedupe
    const tagsets= rawTagsets.map(tagset=>{
     return Object.entries(tagset).reduce((a, [tag, data]) => (a.push({ [tag]: [...data] }), a), [])  
    }).reduce((a, c) => a.concat(c) ,[])
                 
    return Object.values(tagsets.reduce((r, c) => (r[Object.keys(c)[0]] = r[Object.keys(c)[0]] || c, r), {}));
  }
    
  onTagsetChange(parent, selected){
    const {onTagsetChange} = this.props
    onTagsetChange && onTagsetChange(parent, selected)
  }
  
  
  onCategoryChange(selected){
    const {onCategoryChange} = this.props
    onCategoryChange && onCategoryChange(selected)
  }
  
  onYearChange(selected){
    const {onYearChange} = this.props
    onYearChange && onYearChange(selected)
  } 

  generateCategoryFilters(){
    const {selectedDatasets, onCategoryChange, selectedCategories} = this.props
    return selectedDatasets.map((id, idx)=>{
      //Need to maintain seperate categorisations per dataset (!!)
      const { categories, name } = this.getSelectedDataset(id)
      const selected = selectedCategories.filter(i=>i.parent === id)[0]

      const options = categories.map(category=>{
        return {
          label: category,
          value: category,
          default: selected && selected['categories'].includes(category)
        }
      })
      return (<Filter key={idx} isMulti selectAll options={options} onChange={selection => onCategoryChange && onCategoryChange(id, selection)} title={`${name} categories`}/>)
    })
  }
  
  generateTagFilters(){
    const {selectedTags} = this.props
    const set = this.getCommonTagset().filter(b => Object.keys(b)[0] !== 'Year')
    const filters = set.map((set, idx)=>{
      const title = Object.keys(set)[0]
      const options = set[title].map(option=>{
        return {
          label: option,
          value: option,
          default: selectedTags.find(i=> i.selected.includes(option) && i.parent === title)
        }
      })
      
      return (<Filter key={idx} selectAll isMulti title={title} options={options} onChange={sel=>this.onTagsetChange(title, sel)}></Filter>)
    })
    
    return filters;
  }
  
  getSeries(){
    //Data is stored alongside entities
    const {selectedTags, entities} = this.props
    const {stackType} = this.state;
    const flattenedSelectedTags = selectedTags.reduce((a, c)=> a.concat(c.selected), [])
    
    if(selectedTags.length > 0 && console.debug('No tags selected')){
      return;
    }
    
    const series = selectedTags.filter(tagset => tagset.parent !== 'Year').map((item, idx)=>{
      const {selected, parent} = item
      return selected.map((tag, edx)=>{
        //Generates data by entity, by tag. This will 'group' by entity
        //DEV: Create a filter with a Grouping context? (e.g entity, category, tag)
        const data = entities.map(entity => this.generateData({parent, tag}, entity.id))
        return {
          name: tag,
          type: 'column',
          data,
        }
      })
    }).flat().map((series, idx)=>({...series, stack: idx}))
    return series
  }
  
  updateOptions(){
    const {entities, datasets, selectedDatasets} = this.props
    const titleSet = selectedDatasets.map(d => this.getSelectedDataset(d))
    return {
      ...defaultOptions,
      series: this.getSeries().flat(),
      title: {
        text: `${createTitle(titleSet)}, across ${entities.map(e=>e.name).length} entities`
      },
      xAxis: [{
        categories: entities.map(e=>e.name),
      }],
    }
  }
  
  getSelectedDataset(dataset){
    //DEV: dataset is a string/number here
    const {datasets} = this.props;
    console.log(dataset, datasets)
    return datasets.find(d=> Number(d.id) === Number(dataset))
  }
  
  getSelectedEntities(){
    const {selectedEntities, entities} = this.props;
    return selectedEntities.map(e=>entities.filter(d=> d.id == e)[0])
  }
  
  render(){
    
    const {
      selectedCategories, 
      selectedDatasets, 
      selectedEntities,
      selectedTags,
      datasets, 
      entities,
      years, 
      selectedYears, 
      onCategoryChange,
      onYearChange, 
      onDatasetChange
    } = this.props;
    
    return (
      <Fragment>
        <Filters>
          <Filter isMulti options={datasets.map(d=>{
              return {
                value: d.id,
                label: d.name,
                default: selectedDatasets.find(i => i === d.id)
              }
            })
            } onChange={selection=> onDatasetChange && onDatasetChange(selection)} />
           {this.generateCategoryFilters()}

          <Filter isMulti title="Years" options={years.map(year=>({
              value: year,
              label: year,
              default: years.some(i=>selectedYears.includes(i))
            })) 
          } onChange={selection=> onYearChange && onYearChange(selection)} />

          {this.generateTagFilters()}
        </Filters>

        {selectedDatasets.length > 2 && <span>Please select a maximum of two datasets</span>}
        <Charts>
          <HighchartsReact 
            highcharts={Highcharts}
            options={this.updateOptions()} />
        </Charts>
        <Debug>
          <h4>Debug Information</h4>
          <p>Entities: {this.getSelectedEntities().map(e=>e.name).join(', ')}</p>
          <p>Tags: {selectedTags.map(e=> `${e.parent}: [${e.selected.join(', ')}]`)}</p>
          <p>Categories: {selectedCategories.map(e=> `${e.parent}: [${e.categories.join(', ')}]`)}</p>
          <p>Datasets: {selectedDatasets.map(e=>this.getSelectedDataset(e).name).join(', ')}</p>
        </Debug>
      </Fragment>)
  }
}


