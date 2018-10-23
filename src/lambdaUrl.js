function LambdaURL() {
  // return "https://cn67surb5d.execute-api.us-east-1.amazonaws.com/prod"
  // was replaced in createFile in App.js to use Rails backend instead of AWS
  axios.get(
    URL() + `audio?phrase=${phrase}&language=${language}&file_name=${fileName}`
  );
}

export default LambdaURL;
