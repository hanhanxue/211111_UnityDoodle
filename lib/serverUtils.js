import fs from 'fs'
import path from 'path'

import sizeOf from 'image-size'
// import {useRouter} from "next/router"
// import matter from 'gray-matter'
// import { serialize } from 'next-mdx-remote/serialize'







export const getCustomMetadata = (dir) => {

    const P_ABS_doodleDir = path.join(process.cwd(), 'public', 'doodles', dir)
    const C_doodleDir = fs.readdirSync(P_ABS_doodleDir)
    const C_buildDir = fs.readdirSync(path.join(P_ABS_doodleDir, 'Build'))

    const nameSplit = dir.split('_')
    const cover = C_doodleDir.filter(el => el.match(/^cover/g) !== null)[0]
    const coverDimensions = getImageDimensions(path.join(P_ABS_doodleDir, cover), 960, 760)
    const build = C_buildDir[0].split('.')[0]

    const P_STATIC_doodleDir = `/doodles/${dir}`


    let customMetadata = {}

    customMetadata.date = `20${nameSplit[0]}`
    customMetadata.name = nameSplit[2]
    customMetadata.slug = nameSplit[2].replace(/\s+/g, '-').toLowerCase()

    customMetadata.cover = getCover(P_STATIC_doodleDir, cover, coverDimensions)

    customMetadata.unityContextData = getUnityContextData(P_STATIC_doodleDir, build, nameSplit)

    return customMetadata
    }



export const getStaticContent = (P_STATIC) => {
    return fs.readdirSync(path.join(process.cwd(), 'public', P_STATIC)).filter(i => i.match(/^\_/g) === null )
}







const getCover = (P_STATIC_doodleDir, cover, coverDimensions) => {
    let object = {}
    object.P_STATIC = `${P_STATIC_doodleDir}/${cover}`
    object.width = coverDimensions.width
    object.height = coverDimensions.height
    return object
}

const getUnityContextData = (P_STATIC_doodleDir, build, nameSplit) => {
    let object = {}
    object.loaderUrl = `${P_STATIC_doodleDir}/Build/${build}.loader.js`
    object.dataUrl = `${P_STATIC_doodleDir}/Build/${build}.data`
    object.frameworkUrl = `${P_STATIC_doodleDir}/Build/${build}.framework.js`
    object.codeUrl = `${P_STATIC_doodleDir}/Build/${build}.wasm`
    object.defaultDimensions = {
        width: parseInt(nameSplit[1].split('x')[0]),
        height: parseInt(nameSplit[1].split('x')[1]),
    }

    object.defaultWidth = parseInt(nameSplit[1].split('x')[0])
    object.defaultHeight = parseInt(nameSplit[1].split('x')[1])
    
    object.ratio = object.defaultDimensions.width / object.defaultDimensions.height


    return object
}


const getImageDimensions = (P_ABS_cover, MAX_WIDTH, MAX_HEIGHT) => {

    const coverSizeOf = sizeOf(P_ABS_cover)
    let width = coverSizeOf.width
    let height = coverSizeOf.height

    const RATIO = width / height

    if (width > MAX_WIDTH) {

        width = MAX_WIDTH
        height = 1.0 / RATIO * width
    }

    if (height > MAX_HEIGHT) {
        height = MAX_HEIGHT
        width = RATIO * height
    }

    return {width, height}
}