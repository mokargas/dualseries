import React, {Fragment} from 'react'
import ReactDOM from 'react-dom'
import difference from 'lodash.difference'


import App from './components/App'

import entities from './fixture/entities'
import entityData from './fixture/data'
import datasets from './fixture/datasets'


const selectedYear = "2017/18"

//Initially selected year(s)
const selectedYears = ["at 30 June 2017", "at 30 June 2018"]

//All "years" available
const years = ["at 30 June 017", "at 30 June 2018"]

//Initially selected tagsets.
const selectedTags = [{parent: 'Engagement', selected:["Total", "Ongoing", "Non-Ongoing"]}]

//Entities: Require matching data in entityData
const selectedEntities = entities.map( e=>e.id )
const selectedDatasets = [1, 2]

//All would be a special case. We select all here
const selectedCategories = selectedDatasets.map(id => {
  const found = datasets.find(i => Number(i.id) === Number(id));
  console.log(id, found, datasets)
  const { categories } = found;
  return {
    parent: id,
    categories
  };
});

class Container extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      selectedYears,
      selectedTags,
      selectedEntities,
      selectedDatasets,
      selectedCategories,
      datasets,
      entityData,
      entities,
      years,
      isLoading: true
    }
  }
  
  async fetchEntity(id){
    const response = await fetch(`./assets/tables-${id}.txt`)
    const json = await response.json();
    return {id: id, data: json}

  }
   
  componentDidMount(){
     
     const fetches = entities.map(e=> this.fetchEntity(e.id))
                   
     const data = Promise.all(fetches).then(data =>{
       this.setState({
          entityData:data
       })
     }).then(()=>{
       this.setState({isLoading:false})
     })
  }
  
  onChange(selection){
    const { datasets, selectedDatasets, selectedCategories } = this.state
    
    //Contains ids of all selected datasets
    const selectionIds = selection.map(s => Number(s.value))
    
    //Contains ids of all datasets with existing category settings
    const existingCategories = selectedCategories.map(c => c.parent)
    
    //Preselect categories for a new selection. 
    //Check existing    
    const isAdding = selectionIds.length > existingCategories.length
    const isDeleting = selectionIds.length < existingCategories.length
    
    if(isDeleting){
      //Eject category
      const parent = difference(existingCategories, selectionIds)[0]
      console.log('parent', parent)
      this.setState({
        selectedCategories: [...selectedCategories.filter(i=>i.parent !== parent)],
        selectedDatasets: [...selectedDatasets.filter(i=>Number(i.id) !== parent)]
      }, ()=>{
        console.log(this.state)
      })
    }
    
    if(isAdding){
      const parent = difference(selectionIds, existingCategories)[0]
      const newCat = {parent, categories:[]}
      
      const newDatasets  = selectionIds.map(id=>datasets.find(i=>Number(i.id) === Number(id)))
      const selectedIds = newDatasets.map(d=>d.id)
      
      this.setState({
        selectedCategories: [...selectedCategories, newCat],
        selectedDatasets: selectedIds
      }, ()=>{
        console.log(this.state)
      })
    }
    
    console.log('isAdding:', isAdding, 'isDeleting', isDeleting)
  }
  
  
  onCategoryChange(parent, selected){   
    const {selectedCategories} = this.state;
    const categories = selected.map(s=>s.value)
   
    this.setState({
      selectedCategories:[
        ...selectedCategories.filter(category=>category.parent !== parent),
        {parent, categories}
      ]
    })
  }
  
  onTagsetChange(parent, selected){
    const {selectedTags} = this.state
    this.setState({
      selectedTags:[
        ...selectedTags.filter(tag=>tag.parent !== parent),
        {parent, selected: selected === null ? [] : selected.reduce((a, c)=> a.concat(c.value), [])}
      ]
    })
  }
  
  onYearChange(selected){
    this.setState({
      selectedYears: selected? selected.map(a=>a.value): []
    })
  } 
  
  render(){
    const {   
      selectedYears,
      selectedTags,
      selectedEntities,
      selectedDatasets,
      datasets,
      entityData,
      selectedCategories,
      years,
      entities,
      isLoading,
    } = this.state;
    return (
        <Fragment>
        {!isLoading && <App onYearChange={s=>this.onYearChange(s)} 
        years={years} 
        onDatasetChange={s=>this.onChange(s)} 
        onTagsetChange={(p,s)=>this.onTagsetChange(p,s)} 
        onCategoryChange={(p, s)=>this.onCategoryChange(p, s)}
        data={entityData} 
        datasets={datasets} 
        entities={entities} 
        selectedYears={selectedYears} 
        selectedCategories={selectedCategories} 
        selectedTags={selectedTags} 
        selectedEntities={selectedEntities} 
        selectedDatasets={selectedDatasets} />
        }
        </Fragment>
      )
  }
}

ReactDOM.render(<Container />, document.getElementById('main'));