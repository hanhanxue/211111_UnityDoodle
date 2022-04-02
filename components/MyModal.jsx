

// 01 Vendor Components
import {useState, useEffect, useRef, useLayoutEffect } from 'react'




// 03 My Components
import MyUnityCanvas from '../components/MyUnityCanvas'

// 04 My Styles
import styles from './MyModal.module.scss'



const MyModal = (props) => {


    const modalOverlayRef = useRef()
    const [frameSize, setFrameSize] = useState(100)

    const [doodleDimensions, setDoodleDimensions] = useState({
        width: 100,
        height: 100,
      })



    // DEBOUNCE
    const debounce = (fn, ms) => {
        let timeoutId = null
        return () => {
            clearTimeout(timeoutId)
            timeoutId = setTimeout(() => {
                fn.apply(this, arguments)
            }, ms)
        }
    }

    const handleWindowResize = () => {{}
        //props.setDoodleDimensions({width: 128, height: 128})

        if(modalOverlayRef.current) {
            
            const width = modalOverlayRef?.current?.clientWidth
            const height = modalOverlayRef?.current?.clientHeight

            // inner container
            const widthInner = width - 64 - 64
            const heightInner = height - 36 - 36

            // Frame Size
            let frameSize
            frameSize = widthInner < heightInner + 460 ? widthInner - 460 : heightInner
            // clamp frameSize
            frameSize = frameSize > 1024 ? 1024 : frameSize


            // Doodle Size
            let doodleDimensions = {width: props.doodleDefaultDimensions.width, height: props.doodleDefaultDimensions.height,}
            if(doodleDimensions.width > frameSize) {
                doodleDimensions.width = frameSize
                doodleDimensions.height = doodleDimensions.width / props.doodleRatio
            }
            if(doodleDimensions.height > frameSize) {
                doodleDimensions.height = frameSize
                doodleDimensions.width = doodleDimensions.height * props.doodleRatio
            }


            setFrameSize(frameSize)
            setDoodleDimensions(doodleDimensions)
        }
    }



    const debouncedHandleWindowResize = debounce(handleWindowResize, 100)




    useLayoutEffect(() => {
        document.body.style.overflow = "hidden"
        handleWindowResize()
        window.addEventListener('resize', debouncedHandleWindowResize)
        return () => {
            document.body.style.overflow = "auto"
            window.removeEventListener('resize', debouncedHandleWindowResize)
        }
    }, [])







    // ESCAPE KEY
    const closeOnEscapeKeyDown = (e) => {
        if((e.charCode || e.keyCode) === 27) {
            props.onRequestClose()
        }
    }

    useEffect(() => {
        document.body.addEventListener('keydown', closeOnEscapeKeyDown)
        return () => {document.body.removeEventListener('keydown', closeOnEscapeKeyDown)}
    }, [])











    if(!props.isOpen) {
        return null
    }
    return (

        <div ref={modalOverlayRef} className={`${styles.modalOverlay}`} onClick={props.onRequestClose}>
        <div className={`${styles.modal}`} onClick={e => e.stopPropagation()} >  


            <div className={`${styles.modalLeftFrame}`} style={{width: frameSize, height: frameSize}}>
                {props.children}
                <MyUnityCanvas 
                    unityContextData={props.unityContextData} 
                    doodleDimensions={doodleDimensions}
                    />
            </div>

            <div className={`${styles.modalRightFrame}`} style={{width: 460}}>

            </div>


        </div>
        </div>
    )
}

export default MyModal








// const heightRelativeToWidth = modalOverlayRef?.current?.clientWidth / ASPECT_RATIO
// const widthRelativeToHeight = modalOverlayRef?.current?.clientHeight * ASPECT_RATIO

// const fittedWidth  = (heightRelativeToWidth > height ? widthRelativeToHeight : width) - 128
// const fittedHeight = (heightRelativeToWidth > height ? height : heightRelativeToWidth) - 48


    // const getWidth = () => window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth; https://dev.to/vitaliemaldur/resize-event-listener-using-react-hooks-1k0c
    // const ASPECT_RATIO = 16 / 9

    // const [dimensions, setDimensions] = useState({
    //     width: 100, //window.innerWidth
    //     height: 100,
    // })


// useEffect( () => {

//     if(modalWrapperRef.current) {
//         const wrapperDimensions = modalWrapperRef.current.getBoundingClientRect()
//         console.log(wrapperDimensions.width, wrapperDimensions.height)
//     }

// }, [modalWrapperRef])
// // Width

// const [dimensions, setDimensions] = React.useState({
//     width: window.innerWidth,
//     height: window.innerHeight,
//   });




// <div className={`${styles.modalOverlay}`} onClick={props.onRequestClose}>
//     <div className={`${styles.modalWrapper}`} onClick={e => e.stopPropagation()}>  

//     <div className={`${styles.modal}`}>  


//         <div className={`${styles.modalLeftFrame}`}>
//             {props.children}
//             hoserg
//         </div>
//         <div className={`${styles.modalRightFrame}`}>
//             gasdfasdf
//             asdfasdf
//             <br/>
//             gawefsdf
//         </div>

//     </div>

//     </div>
// </div>




//     let timeoutId = null
//     const handleWindowResize = () => {
//         if(modalOverlayRef.current) {
            
//             //console.log(`client height: ${modalOverlayRef.current.getBoundingClientRect().width} and height: ${modalOverlayRef?.current?.clientWidth}`)
//             const width = modalOverlayRef?.current?.clientWidth
//             const height = modalOverlayRef?.current?.clientHeight

//             const heightRelativeToWidth = modalOverlayRef?.current?.clientWidth / ASPECT_RATIO
//             const widthRelativeToHeight = modalOverlayRef?.current?.clientHeight * ASPECT_RATIO


// // heightRelativeToWidth > height, Yes = TOO WIDE so height stay the same and width is relate to height
//                                   //NO = TOO TALL so width stay the same and height is new height.
//             const fittedWidth  = heightRelativeToWidth > height ? widthRelativeToHeight : width
//             const fittedHeight = heightRelativeToWidth > height ? height : heightRelativeToWidth

//             console.log("called")
//             clearTimeout(timeoutId)
//             timeoutId = setTimeout(() => setDimensions({
//                 width: fittedWidth, //modalOverlayRef?.current?.clientWidth,
//                 height: fittedHeight, //modalOverlayRef?.current?.clientHeight
//             }), 150)
//         }
//     }