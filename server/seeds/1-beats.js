exports.seed = function (knex, Promise) {
    return knex('beats').insert([
        {id:1, beat_id: 1, sound: 'basskick', timing: 0},
        {id:2, beat_id: 1, sound: 'basskick', timing: 500},
        {id:3, beat_id: 1, sound: 'clap', timing: 700},
        {id:4, beat_id: 1, sound: 'basskick', timing: 1500},
        {id:5, beat_id: 1, sound: 'clap', timing: 1750}
    ])
}