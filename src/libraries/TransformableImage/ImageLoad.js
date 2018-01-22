/**
 * 图片预加载的帮助组件
 */
import PropTypes from "prop-types";
import React, { Component } from "react";
import { Image, ImageBackground, ActivityIndicator, View } from "react-native";

export default class ImageLoad extends Component {
  static propTypes = {
    isShowActivity: PropTypes.bool,
    borderRadius: PropTypes.number
  };

  static defaultProps = {
    isShowActivity: true,
    borderRadius: 0
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      isError: false
    };
  }

  onLoadEnd = () => {
    this.setState({
      isLoaded: true
    });
  };

  onError = () => {
    this.setState({
        isLoaded: true
    });
  };

  render() {
    const {
      style,
      source,
      children,
      resizeMode,
      borderRadius,
      loadingStyle,
      customImagePlaceholderDefaultStyle
    } = this.props;
    return (
      <ImageBackground
        onLoadEnd={this.onLoadEnd}
        onError={this.onError}
        style={[styles.backgroundImage, style]}
        source={source}
        resizeMode={resizeMode}
        borderRadius={borderRadius}
      >
        {this.state.isLoaded && !this.state.isError ? (
          children
        ) : (
          <View
            style={[styles.viewImageStyles, { borderRadius: borderRadius }]}
          >
            {this.props.isShowActivity && (
              <ActivityIndicator
                style={styles.activityIndicator}
                size={loadingStyle ? loadingStyle.size : "large"}
                color={loadingStyle ? loadingStyle.color : "white"}
              />
            )}
            <Image
             {...this.props}
              style={
                style
                  ? style
                  : [
                      styles.imagePlaceholderStyles,
                      customImagePlaceholderDefaultStyle
                    ]
              }
            />
          </View>
        )}
        {this.props.children && (
          <View style={styles.viewChildrenStyles}>{this.props.children}</View>
        )}
      </ImageBackground>
    );
  }
}

const styles = {
  backgroundImage: {
    position: "relative",
    backgroundColor: "#00000000"
  },
  activityIndicator: {
    position: "absolute",
    margin: "auto",
    zIndex: 9
  },
  viewImageStyles: {
    // flex: 1,
    backgroundColor: "#00000000",
    justifyContent: "center",
    alignItems: "center"
  },
  imagePlaceholderStyles: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    justifyContent: "center",
    alignItems: "center"
  },
  viewChildrenStyles: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: "absolute",
    backgroundColor: "#00000000"
  }
};
