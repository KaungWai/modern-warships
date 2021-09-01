import { createRequire } from "module";
const require = createRequire(import.meta.url);

import fetch from 'node-fetch'
const fs = require('fs')
const setting = require("./setting.json");

fetch(setting.api_url)
    .then((res) => {
        res.text().then((body) => {
            let api_result = JSON.parse(body)
            pre_render(api_result)
        });

    })

function pre_render(api_result) {
    const output_folder = setting.output_folder
    const url_prefix = setting.url_prefix
    const template_path = setting.template_path

    const ships = api_result.ships

    fs.mkdirSync(output_folder);

    fs.readFile(template_path, 'utf8', (err, original_template) => {
        if (err) {
            console.error(err)
            return
        }

        ships.forEach(each_ship => {
            let each_template = original_template
            each_template = each_template.replace(/%title%/gi, each_ship.name)
            each_template = each_template.replace(/%description%/gi, 'See specifications, armament and embarkment details of ' + each_ship.name)
            each_template = each_template.replace(/%url%/gi, url_prefix + each_ship.id)
            each_template = each_template.replace(/%site_name%/gi, 'MW Ranking')
            each_template = each_template.replace(/%image_url%/gi, each_ship.image_url)

            let output_path = output_folder + 'ship_' + each_ship.id +'.html'

            fs.writeFile(output_path, each_template, err => {
                if (err) {
                    console.error(err)
                    return
                }
                console.error(output_path + ' has written successfully.')
            })
        });
    })

}