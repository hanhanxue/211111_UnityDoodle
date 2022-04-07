



// 00 Vendor Libs
// import fs from 'fs'
// import path from 'path'

//import sizeOf from 'image-size'
import {useRouter} from "next/router"
//import matter from 'gray-matter'
//import { serialize } from 'next-mdx-remote/serialize'



// 01 Vendor Components
import ReactModal from "react-modal"
import NextImage from 'next/image'
import NextLink from 'next/link'

import { MDXRemote } from 'next-mdx-remote'

// 02 My Libs
import {getCustomMetadata, getStaticContent} from '../lib/serverUtils'



// 03 My Components
import MyUnityCanvas from '../components/MyUnityCanvas'
import MyModal from '../components/MyModal'
import Sidebar from '../components/MySidebar'

// 04 My Styles
//import styles from '../styles/Doodles.module.scss'
//import modalStyles from '../components/Modal.module.scss'



ReactModal.setAppElement("#__next")



const Home = ( {doodles} ) => {

  const router = useRouter()
  const selectedDoodle = doodles.filter(i => i.slug === router.query.doodleSlug)[0] 

  //console.log(selectedDoodle)
  return (
    <>
    <main className={`section sectionDefault`}>
    <div className={`wrapper`}> 
    <div className={`letterbox_64_128`}>
    <div className={`tilesContainer textAlignCenter`}>


      {doodles.map((doodle, index) => {

             return (    

              <NextLink 
              key={index}
              href = {`/?doodleSlug=${doodle.slug}`}   // the page in nextjs that is linked to (what nextJS will see) ? is a query parameter
              as = {`/doodles/${doodle.slug}`}   // what shows up in the URL
            >

              <a>
                <div className={`nextImageDiv BorderMargin_6`}>

                  <NextImage 
                    src={doodle.cover.P_STATIC}
                    width={doodle.cover.width}
                    height={doodle.cover.height}
                  />
                </div>     
              </a>
            </NextLink>
    
            )

             })}


    </div>
    </div>
    </div>
    </main>


    {selectedDoodle && 
    <MyModal
      isOpen={!!router.query.doodleSlug}
      onRequestClose={() => router.push("/")}
      doodleRatio={selectedDoodle.unityContextData.ratio}
      doodleDefaultDimensions={selectedDoodle.unityContextData.defaultDimensions}
      unityContextData={selectedDoodle.unityContextData}
    >
      
      {/* <MyUnityCanvas 
        unityContextData={selectedDoodle.unityContextData} 
        doodleDimensions={doodleDimensions}
      /> */}
      <Sidebar 
        date={selectedDoodle.date}
        name={selectedDoodle.name}
        MDXSource={selectedDoodle.MDXSource}
      />

    </MyModal>}



    </>
  )
  


}

export default Home








export const getStaticProps = async () => {

  const C_doodlesDir = getStaticContent('doodles')
  let doodles = [] 
  doodles =    await Promise.all( C_doodlesDir.map((dir) => getCustomMetadata(dir)).reverse()   )

  //console.log(doodles[0].MDXSource)

  return {
    props: {
      doodles,
    }
  }
}









/* {selectedDoodle[0] && <MyUnityCanvas unityContextData={selectedDoodle[0].unityContextData} />} */

// {/* <ReactModal 
//   isOpen={!!router.query.doodleSlug} // when I click, the URL will have a query param called doodleSlug, !! convert into a Bool
//   onRequestClose={() => router.push("/")}
// >
//   {  selectedDoodle[0] && <MyUnityCanvas unityContextData={selectedDoodle[0].unityContextData} />}

// </ReactModal> */}









  // // TODO Convert to CSS
  // const customStyles = {
  //   content: {
  //     top: '50%',
  //     left: '50%',
  //     right: 'auto',
  //     bottom: 'auto',

  //     transform: 'translate(-50%, -50%)',

  //     lineHeight: 0,
  //   },
  //   overlay: {
  //     backgroundColor: 'rgba(0, 0, 0, 0.8)',
  //   }
  // };

















// const P_ABS_root = process.cwd()
// const P_ABS_doodlesDir = path.join(P_ABS_root, 'public', 'doodles')



// // GET CONTENT OF DOODLES DIR
// let C_doodlesDir = fs.readdirSync(P_ABS_doodlesDir)
// C_doodlesDir = C_doodlesDir.filter(i => i.match(/^\_/g) === null )  // Filter underscore




// const genProps = async (current_dir) => {

//   const P_REL_doodleDir = path.join('/doodles', current_dir)
//   const P_ABS_doodleDir = path.join(P_ABS_doodlesDir, current_dir)

//   let customData = {}


//   // GET CONTENT OF DOODLE DIR
//   const C_doodleDir = fs.readdirSync(P_ABS_doodleDir)  // \doodles\211117_1024x768_Drive Mode Camera Transitions




//   // GET 
//   const P_REL_mdx = path.join(P_ABS_doodleDir, 'index.mdx')
//   const {content, data} = matter(fs.readFileSync(P_REL_mdx, 'utf-8')) // content is the file and data is the frontmatter
//   // console.log(content)
//   // console.log('data')
//   // console.log(data)
//   const source = fs.readFileSync(P_REL_mdx, 'utf-8')
//   //console.log(source)

//   // Date / Resolution / Name / Slug
//   const dateRezName = current_dir.split('_')
//   customData.date = dateRezName[0] ? '20' + dateRezName[0] : 'ERROR'    // ADD TO CUSTOMDATA
//   customData.rez = dateRezName[1] ? dateRezName[1] : 'ERROR'     // ADD TO CUSTOMDATA
//   customData.name = dateRezName[2] ? dateRezName[2] : 'ERROR'   // ADD TO CUSTOMDATA

//   customData.slug = dateRezName[2] ? dateRezName[2].replace(/\s+/g, '-').toLowerCase() : 'ERROR'    // ADD TO CUSTOMDATA





//   // COVER Image
//   const coverImage = C_doodleDir.filter(c => c.match(/^cover/g) !== null )[0]

//   const coverImage_localPath = path.join(P_ABS_doodleDir, coverImage)  // D:\C_2021\1111_UnityPrototypes\1d\unity-doodle\public\doodles\211117_1024x768_Drive Mode Camera Transitions\cover.jpg
//   let coverImage_publicPath = path.join(P_REL_doodleDir, coverImage)
//   coverImage_publicPath = coverImage_publicPath.replace(/\\/g, "/")   // /doodles/211117_1024x768_Drive Mode Camera Transitions/cover.jpg


//   // COVER Image SIZE
//   let coverDimensionsOf = sizeOf(coverImage_localPath)  ////????? Why can this be CONST? changed to let but const still works
  
//   const MAX_WIDTH = 960
//   const MAX_HEIGHT = 760

//   let ratio

//   if (coverDimensionsOf.width > MAX_WIDTH) {
//       ratio = coverDimensionsOf.height / coverDimensionsOf.width
//       coverDimensionsOf.width = MAX_WIDTH
//       coverDimensionsOf.height = coverDimensionsOf.width * ratio
//   }
//   if (coverDimensionsOf.height > MAX_HEIGHT) {
//       ratio = coverDimensionsOf.width / coverDimensionsOf.height
//       coverDimensionsOf.height = MAX_HEIGHT
//       coverDimensionsOf.width = coverDimensionsOf.height * ratio
//   }

//   customData.coverImage = {coverImage_publicPath, coverDimensionsOf}   // ADD TO CUSTOMDATA





//   // UNITY Build
//   const build_localPath = path.join(P_ABS_doodleDir, 'Build')

//   let build_publicPath = path.join(P_REL_doodleDir, 'Build')
//   build_publicPath = build_publicPath.replace(/\\/g, "/")   // /doodles/211117_1024x768_Drive Mode Camera Transitions/Build
//   const build_content = fs.readdirSync(build_localPath)

//   const buildName = build_content[0].split('.')[0]
//   const buildWidth = parseInt(current_dir.split('_')[1].split('x')[0])
//   const buildHeight = parseInt(current_dir.split('_')[1].split('x')[1])

//   let unityContextData = {}
//   unityContextData.loaderUrl = path.join(build_publicPath, `${buildName}.loader.js`).replace(/\\/g, "/") 
//   unityContextData.dataUrl = path.join(build_publicPath, `${buildName}.data`).replace(/\\/g, "/") 
//   unityContextData.frameworkUrl = path.join(build_publicPath, `${buildName}.framework.js`).replace(/\\/g, "/") 
//   unityContextData.codeUrl = path.join(build_publicPath, `${buildName}.wasm`).replace(/\\/g, "/") 
//   unityContextData.width = buildWidth
//   unityContextData.height = buildHeight


//   customData.unityContextData = unityContextData    // ADD TO CUSTOMDATA
//   //console.log(build_content)

//   const mdxSource = await serialize(source, {
//     scope: customData
//   })

//   //console.log(mdxSource)


//   return mdxSource

// }

  //doodles = await Promise.all(C_doodlesDir.map(genProps))

