import { useState, useEffect } from 'react'
//import hw from './assets/hard.json'
import hwService from './services/hwService'
import Hardware from './components/Hardware'
import Header from './components/Header'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [ hardware, setHardware] = useState()
  const [ hardwareitem, setHardwareItem] = useState()
  const [ hardwarelist, setHardwarelist] = useState()
  const [ hardwaredesc, setHardwareDesc] = useState()
  const [ components, setComponents] = useState()
  const [ compdesc, setCompDescs] = useState()

  let descriptiondialog = document.getElementById('descriptionwrap');

  // The clicked hardware item is hilighted and it has the class activehw.
  // Hilight and class are removed from it by using this function when
  // another hardware item is selected or when the hardware description
  // window is closed.
  const removeActive = () => {
  let activecomponents = document.getElementsByClassName('activehw');
  console.log(activecomponents.length)
  console.log("type"+typeof activecomponents)
  let actives = Object.entries(activecomponents)
  console.log(actives)
  if(actives.length > 0){
    actives.forEach(element => {
      console.log("active "+actives.length)
      console.log("yes"+actives.length)
      element[1].classList.remove("activehw")
    });
  }
  //target.currentTarget.classList.add("activehw")
}

// The hardware description window has two tabs for the selected hardware
// item description and for the list of iẗ́'s components. When the tab is
// changed, hilight and activetab class are removed from the other tab
// with this function.
const removeActiveTab = () => {
  let activecomponents = document.getElementsByClassName('activetab');
  let actives = Object.entries(activecomponents)
  console.log(actives)
  if(actives.length > 0){
    actives.forEach(element => {
      console.log("active "+actives.length)
      console.log("yes"+actives.length)
      element[1].classList.remove("activetab")
    });
  }
}

// The components of the selected hardware component are shown as a list
// in the hardware description window. To show the description of a component,
// list items can be clicked. Hilight and activecomp class are removed
// from the previously selected list item with this function. 
const removeActiveComp = () => {
  console.log("REMOVEACTIVECOMP")
  let activecomponents = document.getElementsByClassName('activecomp');
  let actives = Object.entries(activecomponents)
  console.log(actives)
  if(actives.length > 0){
    actives.forEach(element => {
      console.log("active "+actives.length)
      console.log("yes"+actives.length)
      element[1].classList.remove("activecomp")
    });
  }
}

// The function for closing the hardware description window.
const closeDesc = () => {
  descriptiondialog.classList.replace("visible", "hidden")
  removeActive();
  //removeActiveTab();
}

// Selecting hardware description window and it's components 
let description = document.getElementById('description');
let componentsdesc = document.getElementById('components');
let descriptiontab = document.getElementById('hwtab');
let componentstab = document.getElementById('componentstab');

// Showing hardware description tab in the window
const showHw = (target) => {
  console.log("target"+target)
  description.classList.replace("hidden", "visible")
  componentsdesc.classList.replace("visible", "hidden")
  removeActiveTab();
  target.currentTarget.classList.add("activetab")
  componentstab.classList.remove("activetab")
}

// showing components tab in the window
const showComponents= (target) => {

  console.log("CL "+components.length)

  if (components.length > 0) {
    console.log("OOKOO")
  
  console.log("joo"+target.currentTarget)
  //removeActiveComp()
  description.classList.replace("visible", "hidden")
  componentsdesc.classList.replace("hidden", "visible")
  removeActiveTab();


  let currentcomponents = document.getElementsByClassName('component');
  console.log("currentc "+currentcomponents[0])
  currentcomponents[0].classList.add("activecomp")

  target.currentTarget.classList.add("activetab")
  //descriptiontab.classList.remove("activetab")
  }
}

// Showing component description in the window when clicking on a component list item
const showCompDesc = (target, description) => {
  console.log("joo"+description)
  setCompDescs(description)
  removeActiveComp()
  target.currentTarget.classList.add("activecomp")
}

// Showing the hardware description window for the selected hardware item
  const showDesc = (hw, target) => {
    descriptiondialog.classList.replace("hidden", "visible")
    descriptiontab.classList.add("activetab")
    componentstab.classList.remove("activetab")
    description.classList.replace("hidden", "visible")
    componentsdesc.classList.replace("visible", "hidden")
    //showHw();
    console.log("jee"+hw.description)
    console.log(target.currentTarget)
    setHardwareDesc(hw.description)
    setHardwareItem(hw.name)
    let cindex = 0
    removeActive();
    removeActiveComp();

    const component = hw.components?.map((hw1) =>{
      cindex = cindex+1
      if (cindex === 1) {
        console.log("komp1")
        setCompDescs(hw1.description)
        return(
          <div className="component activecomp" key={cindex} description={hw1.description} onClick={(target) => showCompDesc(target, hw1.description)}>
            <h3>{hw1.name}</h3>
          </div>
        )
      }
      else {
        console.log("muu komp")
        return(
          <div className="component" key={cindex} description={hw1.description} onClick={(target) => showCompDesc(target, hw1.description)}>
            <h3>{hw1.name}</h3>
          </div>
        )

      }
    })

    console.log("components "+hw.components.length)
    console.log("component "+component.length)
    console.log("component "+component[0])

    let newcomponents = Object.entries(component)
    //console.log("newcomponents "+newcomponents[0][1])
    //let thecomponents = Object.entries(newcomponents[0][1])
    //console.log("component "+thecomponents)

    setComponents(component)
    target.currentTarget.classList.add("activehw")
  }


  // Getting hardware data
  useEffect(() => {
    hwService.getHW()
      .then(response => {
        console.log(response.data)
        setHardware(response.data)
      })

  }, [])

  return (
    <>
    <div id="mainheader">
    <h2>NASA Open Science Data Repository Browser</h2>
    </div>
    <div id="wrapper">
      {hardware?.map(hw =>
        <Hardware key={hw.id} hardware={hw} showDesc={showDesc}/> 
      )}
    </div>
    <div id="descriptionwrap" className="hidden">
      <Header showHw={showHw} showComponents={showComponents} hardwareitem={hardwareitem} closeDesc={closeDesc}/>
      <div id="description" className='hidden'>
      <p>
        {hardwaredesc}
      </p>
      </div>
      <div id="components" className='hidden'>
        <div id="componentlist">
          {components}
        </div>
        <div id="componentdesc">
          <p>{compdesc}</p>
        </div>

      </div>
    </div>
    </>
  )
}

export default App