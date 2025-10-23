
import banner from "../../assets/banner.png"


function Banner() {
  return (
      <div className='flex flex-col md:flex-row-reverse py-16 justify-between items-center gap-12'>
         <div className='md:w-1/2 w-full flex items-center md:justify-end transition hover:scale-105'>
            <img src={banner} alt="" />
        </div>
        
        <div className='md:w-1/2 w-full'>
            <h1 className='md:text-5xl text-2xl font-medium mb-7'>New Releases This Week</h1>
            <p className='mb-10'>unleash your reading list with some of the latest and greatest collection this week.we present you new fiction,adventure,self help and comic books at a %50 discount checkout our collection</p>

            
        </div>
</div>
  )
}

export default Banner