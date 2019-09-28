import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';

/* Import Components */

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
    
    const selectionIds = selection.map(s => s.value)
    const newDatasets  = selectionIds.map(id=>{
      return datasets.find(i=>Number(i.id) === Number(id))
    })
    console.log('dataset on change', selection, selectionIds, selectedDatasets)
    
    const selectedIds = selectedDatasets ? selectedDatasets.map(d=>d.id): []
    
    //Preselect categories for a new selection. 
    //Check existing 
    selectedCategories.find(i=>i.parent)
    
    
    console.log('selected ids', selectedIds)
    this.setState({
      selectedDatasets: selectedIds
    })
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