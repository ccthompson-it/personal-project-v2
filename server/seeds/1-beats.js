exports.seed = function (knex, Promise) {
    return knex('beats').insert([
        {id:1, sound: 'basskick', timing: 0},
        {id:2, sound: 'basskick', timing: 500},
        {id:3, sound: 'clap', timing: 700},
        {id:4, sound: 'basskick', timing: 1500},
        {id:5, sound: 'clap', timing: 1750}
    ])
}