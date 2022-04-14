import moment from 'moment'


import { MDXRemote } from 'next-mdx-remote'

import MyMDXComponents from './MyMDXComponents'




// 04 My Styles
import styles from './MySidebar.module.scss'

const Sidebar = (props) => {


    return (
        <>
        <div className={`${styles.sidebar}`}>
            <div className={`${styles.sidebarWrapper}`}>


            <div className={`${styles.headerFrame}`}>

                <div className={`${styles.headerFrameLeft}`}>
                    <h2 className={`${styles.headerFrameTitle} title_2`}>{props.name}</h2>
                    <span className={`${styles.headerFrameSubtitle} caption_1`}>{props.MDXSource.frontmatter.softwares[0]} • {props.MDXSource.frontmatter.categories[0]}</span>
                </div>

                <div className={`${styles.headerFrameRight}`}>
                    <button className={`${styles.defaultButton} subtitle_1`}>Download</button>
                </div>


            </div>

            {/* <hr className={`${styles.hr}`} /> */}


            <div className={`${styles.bodyFrame}`}>

              <MDXRemote {...props.MDXSource} components={MyMDXComponents}/>

            </div>
            </div>



            <div className={`${styles.footerFrame}`}>
                <p className={`subtitle_1`}>{`${moment(props.date).format('MMMM Do YYYY')}`}
                <span className={`body_1`}> {`(${moment(props.date).fromNow()})`}</span></p>
            </div>
        </div>
        </>
    )
}

export default Sidebar







{/* <div className={`${styles.block} body_1`}>
</div>


<div className={`${styles.block} body_1`}>
    <h3 className={`subtitle_1`}> 
        Instructions
    </h3>
    <ul>
        <li>Press P for Park F for Front</li>
        <li>Press P for Park F for Front</li>
    </ul>
</div>

<div className={`${styles.block} body_1`}>
    <h3 className={`subtitle_1`}> 
        Metadata
    </h3>
    <ul>
        <li>Default resolution 512x512</li>
    </ul>
</div> */}