import BestSeller from "../Components/BestSeller"
import Hero from "../Components/Hero"
import LatestCollections from "../Components/LatestCollections"
import NewsLetter from "../Components/NewsLetter"
import OurPolicy from "../Components/OurPolicy"

function Home() {
  return (
    <div>
       <Hero/>
       <LatestCollections/>
       <BestSeller/>
       <OurPolicy/>
       <NewsLetter/>
    </div>
  )
}

export default Home