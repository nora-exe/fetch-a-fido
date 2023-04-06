# fetch-a-fido

A website to help dog-lovers search through a database of shelter dogs, with the hope of finding a lucky dog a new home!

## 🐶 about
Users enter name and email on a login screen. When authenticated, user lands on a search page where they can filter by breed, minimum age, maximum age, and sort by name, breed, and age, with paginated results. By default all dogs are displayed, sorted alphabetically by breed. All fields of the dog data objects are presented, except for zip code which gets converted to a city name and state abbreviation. Dogs can be favorited, and a Match button chooses a dog for the user from their favorites.

Color palette is based off [Fetch Rewards](https://fetch.com/).

***

## 🐶 local setup
run the following commands in your command prompt (uses node.js and NPM)
```
git clone https://github.com/nora-exe/fetch-a-fido.git
cd fetch-a-fido
npm install
npm start
```
