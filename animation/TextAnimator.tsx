import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Animated,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';

export interface Props {
  duration: number;
  onDone?: () => any;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  content: string;
}

export default class TextAnimator extends React.Component<Props> {
  animatedValues: any = [];
  textArr: any;

  constructor(props) {
    super(props);

    const textArr = props.content.trim().split(' ');
    textArr.forEach((_, i) => {
      this.animatedValues[i] = new Animated.Value(0);
    });
    this.textArr = textArr;
  }

  componentDidMount() {
    this.animated();
    console.log('tes');
  }

  animated = (toValue = 1) => {
    const animations = this.textArr.map((_, i) => {
      return Animated.timing(this.animatedValues[i], {
        toValue,
        duration: this.props.duration,
        useNativeDriver: true,
      });
    });

    Animated.stagger(this.props.duration / 6, animations).start();
  };

  render() {
    return (
      <View style={[this.props.style, styles.textWrapper]}>
        {this.textArr.map((word, index) => {
          return (
            <Animated.Text
              key={`${word}-${index}`}
              style={[
                this.props.textStyle,
                {
                  opacity: this.animatedValues[index],
                  transform: [
                    {
                      translateY: Animated.multiply(
                        this.animatedValues[index],
                        new Animated.Value(-5),
                      ),
                    },
                  ],
                },
              ]}>
              {word}
              {`${index < this.textArr.length ? ' ' : ''}`}
            </Animated.Text>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});
