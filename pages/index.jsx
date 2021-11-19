

import fs from 'fs'
import path from 'path'
const sizeOf = require('image-size')

import NextImage from 'next/image'
import NextLink from 'next/link'


import styles from '../styles/Doodles.module.scss'



export default function Doodles( {doodles}) {




  return (
    <>

<main className={`section sectionDefault`}>
    <div className={`wrapper`}> 
    <div className={`letterbox_64_128`}>



    <div className={`tilesContainer textAlignCenter`}>

    {doodles.map((doodle, index) => {
      
      console.log(doodle.coverImage.publicFilePath)
      return (

          <NextLink href={`/doodles/${doodle.slug}`}>

<div className={`${styles.nextImageDiv} ${styles.BorderMargin_6}`}>
          <NextImage 
        src={doodle.coverImage.publicFilePath}
        width={doodle.coverImage.fileMeta.width}
        height={doodle.coverImage.fileMeta.height}
        key={index}
      />
       
       </div>     
            
            
             </NextLink>



      )


      })}


      </div>



</div>
    </div>
    </main>
    </>
  )


}



export const getStaticProps = async() => {

  const root = process.cwd()


  let doodles = []

  const dirPath = path.join(root, 'public', 'doodles')

  let directories = fs.readdirSync(dirPath)
  directories = directories.filter(i => i.match(/^\_/g) === null )

  directories.map(directory => {

    let customData = {}

    const dateSizeTitle = directory.split('_')

    customData.date = dateSizeTitle[0] ? '20' + dateSizeTitle[0] : 'ERROR'
    customData.size = dateSizeTitle[1] ? dateSizeTitle[1] : 'ERROR'
    customData.title = dateSizeTitle[2] ? dateSizeTitle[2] : 'ERROR'

    customData.slug = dateSizeTitle[2] ? dateSizeTitle[2].replace(/\s+/g, '-').toLowerCase() : 'ERROR'


    const dirPath = path.join(root, 'public', 'doodles', directory)
    const content = fs.readdirSync(dirPath)
    const coverImage = content.filter(c => c.match(/^cover/g) !== null )[0]
    const filePath = path.join(dirPath, coverImage)
    let publicFilePath = path.join('/doodles', directory, coverImage)
    publicFilePath = publicFilePath.replace(/\\/g, "/")


    // SIZE
    let fileMeta = sizeOf(filePath)  ////????? Why can this be CONST? changed to let but const still works

    const MAX_WIDTH = 960
    const MAX_HEIGHT = 760

    let ratio

    if (fileMeta.width > MAX_WIDTH) {
        ratio = fileMeta.height / fileMeta.width
        fileMeta.width = MAX_WIDTH
        fileMeta.height = fileMeta.width * ratio
    }
    if (fileMeta.height > MAX_HEIGHT) {
        ratio = fileMeta.width / fileMeta.height
        fileMeta.height = MAX_HEIGHT
        fileMeta.width = fileMeta.height * ratio
    }





    customData.coverImage = {publicFilePath, fileMeta}

    //console.log(publicFilePath)
    //customeData.coverImage =


    doodles.push(customData)
  })






  // console.log(directories)

  // console.log(doodles)



  // directories.map(directory => {
  //   doodles.push('test')
  // })


  return {
    props: {
      doodles,
    }
  }

}