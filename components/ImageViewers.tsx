// components/ImageViewer.tsx
import React, { memo } from "react";
import { StyleSheet, Image, ImageSourcePropType } from "react-native";

interface ImageViewerProps {
	placeholderImageSource: ImageSourcePropType;
	selectedImage?: string | null;
}

function ImageViewer({
	placeholderImageSource,
	selectedImage,
}: ImageViewerProps) {
	return (
		<Image
			source={
				selectedImage == null ? placeholderImageSource : { uri: selectedImage }
			}
			style={[styles.image]}
		/>
	);
}

const styles = StyleSheet.create({
	image: {
		width: 320,
		height: 440,
		borderRadius: 18,
	},
});

export default memo(ImageViewer);
