// import React, {Component, Fragment} from 'react';
// import LoadingScreen from 'react-loading-screen';

// import loadingImg from "../../assets/img/loading.gif";
// import ComponentIndex from "../../components/components";

// class PostWrapper extends Component{

//     state = {
//         loading: true
//     }

//     componentDidMount = () => {
//         console.log("post wrapper mounted");
//     }

//     setParentState = (obj) => {
//         this.setState(obj);
//     };

//     render(){
//         let ComponentRoute = this.props.ComponentRoute;
//         let {...props} = this.props;
//         return (
//             <LoadingScreen
//                 loading={this.state.loading}
//                 bgColor='#000000'
//                 logoSrc={loadingImg}
//             >
//                 <Fragment>

//                     <ComponentRoute setParentState={this.setParentState} {...props}/>

//                 </Fragment>
//             </LoadingScreen>
//         )
//     }
// }

// export default PostWrapper;

// // Now you need to make conditional to check if prop thing has ":" meaning it is a post and not a page
