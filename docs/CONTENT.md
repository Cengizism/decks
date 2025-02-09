# Content Structure and Adding New Content

## Content Structure

The content for the platform is located in the `/content` folder and organized as follows:

```
Decks/
├── content/
    ├── deck-1/
        ├── images/
            ├── card-1-cover.jpg
            ├── card-1-inline-image.jpg
            ├── ...
        ├── card-1.mdx
        ├── ...
    ├── deck-2/
        ├── images/
            ├── card-2-cover.jpg
            ├── ...
        ├── card-2.mdx
        ├── ...
    ├── ...
```

The learning content, referred to as "Decks" and "Cards," is stored in the `/content` folder as Markdown files with front matter support. Adding a new Markdown file will create new content. The `decks.json` manifest file is used for indexing purposes.

Markdown files are in [MDX](https://mdxjs.com/docs/what-is-mdx/) format, allowing you to use JSX in your markdown content. You can import components, such as interactive charts or alerts, and embed them within your content. This makes writing long-form content with components more dynamic and engaging.

### Decks

Each deck is represented by a folder in the `/content` directory. The deck folders are listed in the `decks.json` manifest file.

Example `decks.json`:

```json
[
  {
    "folder": "deck-1",
    "title": "Deck 1",
    "description": "This is the first deck"
  },
  {
    "folder": "deck-2",
    "title": "Deck 2",
    "description": "This is the second deck"
  }
]
```

### Cards

Each deck contains multiple cards, which are Markdown files within the respective deck folder. Each card file has front matter for metadata.

## Adding New Content

To add a new deck of cards, follow these steps:

1. **Expand the `decks.json` file**: Add a new entry for your deck in the `decks.json` file. Ensure each deck has a unique folder name, title, and description.

   Example:

   ```json
   [
     {
       "folder": "deck-1",
       "title": "Deck 1",
       "description": "This is the first deck"
     },
     {
       "folder": "deck-2",
       "title": "Deck 2",
       "description": "This is the second deck"
     },
     {
       "folder": "deck-3",
       "title": "Deck 3",
       "description": "This is the third deck"
     }
   ]
   ```

2. **Add cards**: Create a new folder under `/content` matching the `folder` name specified in `decks.json`. Folder names should not contain special characters or spaces. Inside this folder, add your card files with `.mdx` extension. Each card file should have a meta section (front matter) and content.

   Example of a card file (`card-1.mdx`):

   ```mdx
   ---
   title: 'Card 1'
   excerpt: 'Lorem ipsum dolor sit amet'
   coverImage: 'cover-1.jpg'
   ---

   Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
   ```

   The `title`, `excerpt`, and `coverImage` properties are required for a card and cannot be left empty.

3. **Add images**: Place accompanying images under `/content/<deck-folder-name>/images`.

   Add the image in markdown content like this:

   ```md
   ![Image Alt Title](images/<image-file-name-with-extension>)
   ```

## Notes

To create the content, we use [`remark`](https://github.com/remarkjs/remark) and [`remark-html`](https://github.com/remarkjs/remark-html) to convert the Markdown files into an HTML string, which is then sent down as a prop to the page. The metadata of every post is handled by [`gray-matter`](https://github.com/jonschlinkert/gray-matter) and also sent as props to the page.
