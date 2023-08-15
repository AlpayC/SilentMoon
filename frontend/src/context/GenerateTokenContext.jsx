// useEffect(() => {
//   if (!accessToken) {
//     const fetchData = async () => {
//       const { data } = await fetch(
//         "https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy",
//         {
//           method: "GET",
//           headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json",
//             Authorization: "Bearer " + accessToken,
//           },
//         }
//       ).then((response) => {
//         console.log(
//           response.json().then((data) => {
//             console.log(data);
//           })
//         );
//       });
//       setMusicData(data);
//     };
//     fetchData();
//   }
// }, []);
