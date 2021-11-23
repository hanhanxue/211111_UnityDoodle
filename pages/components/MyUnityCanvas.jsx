

import Unity, {UnityContext} from "react-unity-webgl"


const MyUnityCanvas = (  {unityContextData}) => {

    if (unityContextData !== "undefined") {
        const style = {
            width: unityContextData.width,
            height: unityContextData.height,
          }
    }



    if (typeof window !== "undefined") {
        const unityContext= new UnityContext({
            loaderUrl: unityContextData.loaderUrl,
            dataUrl: unityContextData.dataUrl,
            frameworkUrl: unityContextData.frameworkUrl,
            codeUrl: unityContextData.codeUrl,
        })
    }
    else
    {
        return null
    }



    return (
        <>

        <div style = {{textAlign: 'center'}}>
            <Unity unityContext={unityContext} style={style}/>
        </div>

        </>
    )
}


export default MyUnityCanvas