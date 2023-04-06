Search
* search by loc
* view list of current favorites

DogContainer
 * randomized description greeting strings
 * conditional articles
 * month or year age? less than year?

Known Issues
* LoginForm - canSubmit behavior - currently an issue with checking state and enabling/disabling submit button, maybe an async issue, maybe an issue with MUI component library possible UN/PWD minimum? don't have enough time to address but ideally just shouldn't be able to submit empty text fields, currently reading state 3x instead of twice I think, but reading and logging state fine
* /locations has a zip code that doesn't correspond to a city/state, its military FPO AA (Armed Forces Americas) and needs to be changed, worked around, or accommodated for
