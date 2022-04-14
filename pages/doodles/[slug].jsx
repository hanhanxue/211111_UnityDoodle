





// 00 Vendor Libs


// import sizeOf from 'image-size'
import {useRouter} from "next/router"
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'

// 01 Vendor Components


// 02 My Libs
import {getStaticContent, genSlug, genPaths, getCustomMetadata} from '../../lib/serverUtils'


// 03 My Components
import MyUnityCanvas from '../../components/MyUnityCanvas'

// 04 My Styles




const Doodle = (  {  doodle }) => {

    const router = useRouter()

    // const {slug} = router.query;
    // console.log(slug)
    console.log(doodle.unityContextData)

    return (
        <>
        
            <div style = {{textAlign: 'center', marginTop: '24px', marginBottom: '24px'}}>
                <button onClick={ () => router.push("/") } style={{cursor: 'pointer'}}>Back</button>
            </div>


            <MyUnityCanvas 
                    unityContextData={doodle.unityContextData} 
                    doodleDimensions={doodle.unityContextData.defaultDimensions}
                    />

        </>
    )


}


export default Doodle




















export const getStaticPaths = async () => {

  const C_doodlesDir = getStaticContent('doodles')


 const paths = genPaths(C_doodlesDir)

    return {
        paths,
        fallback: false
    }

}





export const getStaticProps = async ({params}) => {

    const C_doodlesDir = getStaticContent('doodles')


    const C_doodleDir = C_doodlesDir.filter(d => genSlug(d.split('_')[2]) === params.slug)[0]

    const doodle = await getCustomMetadata(C_doodleDir)


    return {
        props: {
            doodle: doodle
        }
    }
}