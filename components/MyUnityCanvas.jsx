

import Unity, {UnityContext} from "react-unity-webgl"


const MyUnityCanvas = (  {unityContextData, doodleDimensions}) => {



    if (typeof window !== "undefined") {
        const unityContext= new UnityContext({
            loaderUrl: unityContextData.loaderUrl,
            dataUrl: unityContextData.dataUrl,
            frameworkUrl: unityContextData.frameworkUrl,
            codeUrl: unityContextData.codeUrl,
        })

        // const style = {
        //     width: unityContextData.defaultDimensions.width,
        //     height: unityContextData.defaultDimensions.height,
        // }
        const style = {
            width: doodleDimensions.width,
            height: doodleDimensions.height,
        }

    }
    else
    {
        return null
    }



    return (

        <div style = {{textAlign: 'center'}}>
            <Unity unityContext={unityContext} style={style}/>
        </div>

    )
}


export default MyUnityCanvas







        // const style = {
        //     width: doodleDimensions.wdith,
        //     height: doodleDimensions.height,
        //   }
        // const style = {
        //     width: unityContextData.defaultWidth,
        //     height: unityContextData.defaultHeight,
        //   }