const fs = require('fs').promises
const path = require('path')
const { Client } = require('@notionhq/client')

const resolve = (filename) => path.resolve(__dirname, filename)

const { NOTION_TOKEN, NOTION_DATABASE_ID } = process.env
if (!NOTION_TOKEN || !NOTION_DATABASE_ID) {
  console.error('`NOTION_TOKEN` and `NOTION_DATABASE_ID` is needed')
  process.exit(1)
}

const notion = new Client({ auth: NOTION_TOKEN })

;(async () => {
  const response = await notion.databases.query({
    database_id: NOTION_DATABASE_ID,
    filter: {
      and: [
        {
          property: 'Name',
          text: {
            is_not_empty: true,
          },
        },
      ],
    },
    sorts: [
      {
        property: 'LastDate',
        direction: 'descending',
      },
    ],
  })

  const cooperators = response.results.map(({ properties }) => {
    return {
      name: properties.Name.title[0].plain_text,
      times: properties.Times.number,
      description: properties.Description.rich_text[0].plain_text,
      website: properties.Website.url,
      location: properties.Location.select.name,
    }
  })

  let mdString = await fs.readFile(resolve('../README.md'), 'utf8')
  const cooperatorsString = cooperators
    .map((i) => {
      const name = i.website ? `[${i.name}](${i.website})` : i.name
      // return `- ${name}\`(${i.times} times)\` - ${i.description}`
      return `|${name}|\`${i.location}\`|\`${i.times}\`|${i.description}|`
    })
    .join('\n')

  mdString = replacer(mdString, cooperatorsString, 'COOPERATORS')
  await fs.writeFile(resolve('../README.md'), mdString, 'utf8')
})()

function replacer(code, value, key) {
  const START = `<!--${key}_STARTS-->`
  const END = `<!--${key}_ENDS-->`
  const regex = new RegExp(`${START}[\\s\\S]*?${END}`, 'im')
  const header = `|Team/Name|Location|Times|Description|\n|-|-|-|-|`

  const target = value
    ? `${START}\n${header}\n${value}\n${END}\n`
    : `${START}${END}\n`

  return code.replace(regex, target).trim()
}
