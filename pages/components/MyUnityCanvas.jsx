

import Unity, {UnityContext} from "react-unity-webgl"


const MyUnityCanvas = (  {unityContextData}) => {



    if (typeof window !== "undefined") {
        const unityContext= new UnityContext({
            loaderUrl: unityContextData.loaderUrl,
            dataUrl: unityContextData.dataUrl,
            frameworkUrl: unityContextData.frameworkUrl,
            codeUrl: unityContextData.codeUrl,
        })

        const style = {
            width: unityContextData.width,
            height: unityContextData.height,
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