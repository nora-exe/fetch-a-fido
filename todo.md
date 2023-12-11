# Future Features

## General
* landing page other than Login form
* route to view user data
* route to view favorite dogs

## Search
* search by location
* map view
* validate min age is <= max age

## DogContainer
 * randomized greeting strings in description
 * conditional articles
 * represent age in months if less than a year

## Known Issues
* LoginForm - canSubmit behavior - currently an issue with checking state and enabling/disabling submit button, maybe an async issue, maybe an issue with MUI component library, possible UN/PWD minimum? don't have enough time to address but ideally just shouldn't be able to submit empty text fields, currently reading state 3x instead of twice I think, but reading and logging state fine
* /locations has a zip code that doesn't correspond to a city/state, its military FPO AA (Armed Forces Americas) and needs to be changed, worked around, or accommodated for; getCities() in DogContainer currently does this
