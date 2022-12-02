## Intro

HackerNews search
Tech used: NextJS

## Run the project

After cloning the project, install the packages:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Known issues

- Not happy with folder structure, it won't scale. It's better to group files by domain (eg. post, comment, etc) rather than type of file (eg. component, hook, etc)
- Horizontal overflow is coming for some pages - eg. http://localhost:3000/post/28717910 \
  Most likely due to usage of user-generated content on the page.
- Taking lots of time to load the post details page. So when you click on some link at home page it stays there for sometime without giving any feedback. I am yet to figure out how to show loader in this case.
