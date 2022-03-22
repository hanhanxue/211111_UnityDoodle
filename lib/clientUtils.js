


public onCanvasWrapperResize = () => {
    
    // Update the size of the canvas to fit the wrapper
    if (this.canvasWrapperRef.current) {
        const wrapperDimensions = this.canvasWrapperRef.current.getBoundingClientRect();
        const { width, height } = wrapperDimensions;




        const heightRelativeToWidth = width / CAMERA_ASPECT_RATIO;
        const widthRelativeToHeight = CAMERA_ASPECT_RATIO * height;

        const fittedWidth = heightRelativeToWidth > height ? widthRelativeToHeight : width;
        const fittedHeight = heightRelativeToWidth > height ? height : heightRelativeToWidth;


        

        const currSize = new THREE.Vector2();
        this.renderer.getSize(currSize);
        if (currSize.x !== fittedWidth || currSize.y !== fittedHeight) {
            this.renderer.setSize(fittedWidth, fittedHeight);
        }
    }
};