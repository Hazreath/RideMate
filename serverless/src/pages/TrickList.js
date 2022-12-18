import Banner from "../components/Banner";
import ParkList from "../components/ParkList";

/**
 * Displays TrickList page, depending on the mode (not implemented)
 * @returns JSX Content
 */
function TrickList() {
    // alert('ok')
    let content = (
        <div className="app-root">
            <Banner></Banner>

            <ParkList></ParkList>
        </div>
    );
    return content;
}

export default TrickList;
