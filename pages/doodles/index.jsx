
import Unity, { UnityContext } from "react-unity-webgl";




const doodle = () => {



    if (typeof window !== "undefined") {
        const unityContext= new UnityContext({
          loaderUrl: "doodles/211115_512x512_Ratio/Build/output.loader.js",
          dataUrl: "doodles/211115_512x512_Ratio/Build/output.data",
          frameworkUrl: "doodles/211115_512x512_Ratio/Build/output.framework.js",
          codeUrl: "doodles/211115_512x512_Ratio/Build/output.wasm",
        });


        return (


        
            <>
    
            <div>


            <Unity unityContext={unityContext} 
                  style={{
                    height: 512,
                    width: 512,

                  }}/>


            </div>
  
            </>
        )



      }
      else
      {
          return null
      }

      





}


export default doodle;