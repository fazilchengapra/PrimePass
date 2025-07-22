import { Button } from "@radix-ui/themes";
import React from "react"

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  // Called if an error occurs in any child component
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  // Optional: log the error
  componentDidCatch(error, info) {
    console.error("Caught by ErrorBoundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-screen flex flex-col justify-center">
          <div className="w-1/3 m-auto border">
            <div className="w-full p-3">
              <img
                src="/asset/public404.svg"
                alt="404"
                className="w-2/3 h-auto m-auto"
              />
              <a href="/">
                <Button className="w-full m-auto text-center">Go Home!</Button>
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
