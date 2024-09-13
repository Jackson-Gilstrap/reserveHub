// create the function for generating a booking reference

//how we generate a booking reference
// what we need - location, client first & last name, 4 random numbers generated
// take the first letter of each word in the location and client first and last name and append to a 4 random number sequence

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};
const getFirstLetterOfWord = (wordString) => {
  const new_word_string_arr = [];
  const split_word_arr = wordString.split(" ");
  if (split_word_arr.length > 1) {
    split_word_arr.forEach((word) => {
      let first_letter = word.charAt(0);
      new_word_string_arr.push(first_letter);
      
    });
    return new_word_string_arr;
  } else {
    let first_letter = split_word_arr[0].at(0);
    new_word_string_arr.push(first_letter);
    return new_word_string_arr;
  }
};

 const createBookingRef = (
  location_name,
  client_first_name,
  client_last_name
) => {
  //create the random number
  const randomInt = getRandomInt(1000, 9999);
  const location_name_arr = getFirstLetterOfWord(location_name);
  const client_first_name_arr = getFirstLetterOfWord(client_first_name);
  const client_last_name_arr = getFirstLetterOfWord(client_last_name);
  const ln = location_name_arr.join("");
  const cf = client_first_name_arr.toString();
  const cl = client_last_name_arr.toString();
  const bookingRef = ln + cf + cl + randomInt.toString()
  console.log(bookingRef)
  return bookingRef
};


module.exports = {createBookingRef}

