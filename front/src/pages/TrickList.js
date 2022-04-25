import Banner from "../components/Banner"
import ParkList from "../components/ParkList"
import NewTrickModal from "../components/NewTrickModal"


function TrickList() {
    // alert('ok')
    let content = 
      <div className='app-root'>
        <Banner></Banner>
        
        <ParkList></ParkList>
        <NewTrickModal></NewTrickModal>
      </div>
    return content
}

export default TrickList