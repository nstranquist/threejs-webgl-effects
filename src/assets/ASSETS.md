# Assets

### Why

See: https://stackoverflow.com/questions/44643041/do-i-store-image-assets-in-public-or-src-in-reactjs

Anything used at compile time should be in the `src/` of a react app,
Whereas things used outside of that should be in `public/`.

Therefore, keep all resources being used at runtime here (`src/assets/`), and put everything else in `public/`

### Adding a new Asset class

After adding a new subfolder in `src/assets/`, ADD THAT TO THE GITIGNORE!!

I didn't want to ignore this markdown file, so I manually ignored `/models` and `/sprites`. Please follow suit and do the same for anything new that gets added!
