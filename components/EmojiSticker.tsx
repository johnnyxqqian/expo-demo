import { View, Image, ImageSourcePropType } from "react-native";
import {
	PanGestureHandler,
	TapGestureHandler,
	TapGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	useAnimatedGestureHandler,
	withSpring,
} from "react-native-reanimated";

const AnimatedImage = Animated.createAnimatedComponent(Image);
const AnimatedView = Animated.createAnimatedComponent(View);

// type contextType = {translateX: number; translateY: number};

type EmojiStickerProps = {
	imageSize: number;
	stickerSource: ImageSourcePropType;
};

type ContextType = { translateX: number; translateY: number };

export default function EmojiSticker({
	imageSize,
	stickerSource,
}: EmojiStickerProps) {
	const scaleImage = useSharedValue(imageSize);
	const translateX = useSharedValue(0);
	const translateY = useSharedValue(0);

	const onDrag = useAnimatedGestureHandler({
		onStart: (event, context: ContextType) => {
			context.translateX = translateX.value;
			context.translateY = translateY.value;
		},
		onActive: (event, context) => {
			translateX.value = event.translationX + context.translateX;
			translateY.value = event.translationY + context.translateY;
		},
	});

	const containerStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateX: translateX.value,
				},
				{
					translateY: translateY.value,
				},
			],
		};
	});

	const onDoubleTap = useAnimatedGestureHandler<TapGestureHandlerGestureEvent>({
		onActive: () => {
			if (scaleImage.value !== imageSize * 2) {
				scaleImage.value = scaleImage.value * 2;
			}
		},
	});

	const imageStyle = useAnimatedStyle(() => {
		return {
			width: withSpring(scaleImage.value),
			height: withSpring(scaleImage.value),
		};
	});

	return (
		<PanGestureHandler onGestureEvent={onDrag}>
			<AnimatedView style={[containerStyle, { top: -350 }]}>
				<TapGestureHandler onGestureEvent={onDoubleTap} numberOfTaps={2}>
					<AnimatedImage
						source={stickerSource}
						resizeMode="contain"
						style={[imageStyle, { width: imageSize, height: imageSize }]}
					/>
				</TapGestureHandler>
			</AnimatedView>
		</PanGestureHandler>
	);
}
