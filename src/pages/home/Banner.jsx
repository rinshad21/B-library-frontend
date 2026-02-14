



function Banner() {
  return (
      <div className='flex flex-col md:flex-row-reverse py-16 justify-between items-center gap-12'>
  <div className='md:w-1/2 w-full flex items-center md:justify-end transition hover:scale-105'>
    <img 
      src="https://res.cloudinary.com/dshvwoxsw/image/upload/f_auto,q_auto,w_800/v1771052350/vvuogudrw3fp9iy2rdbk.png"
      srcSet="https://res.cloudinary.com/dshvwoxsw/image/upload/f_auto,q_auto,w_400/v1771052350/vvuogudrw3fp9iy2rdbk.png 400w,
              https://res.cloudinary.com/dshvwoxsw/image/upload/f_auto,q_auto,w_800/v1771052350/vvuogudrw3fp9iy2rdbk.png 800w,
              https://res.cloudinary.com/dshvwoxsw/image/upload/f_auto,q_auto,w_1200/v1771052350/vvuogudrw3fp9iy2rdbk.png 1200w"
      sizes="(max-width: 768px) 100vw, 50vw"
      alt="Banner"
      width="800"
      height="600"
      fetchPriority="high"
    />
  </div>
        
        <div className='md:w-1/2 w-full'>
            <h1 className='md:text-5xl text-2xl font-medium mb-7'>New Releases This Week</h1>
            <p className='mb-10'>unleash your reading list with some of the latest and greatest collection this week.we present you new fiction,adventure,self help and comic books at a %50 discount checkout our collection</p>

            
        </div>
</div>
  )
}

export default Banner