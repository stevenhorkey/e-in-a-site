export default function getRandomPic(){

    console.log('pic')

    const pics = [
        // nature
        'http://api.everythinginall.com/wp-content/uploads/2019/01/jurolu3flta.jpg',
        'http://api.everythinginall.com/wp-content/uploads/2019/01/f1oeybkjsdw.jpg',
        'http://api.everythinginall.com/wp-content/uploads/2019/01/znxlvczhhna.jpg',
        'http://api.everythinginall.com/wp-content/uploads/2019/01/0kyp7uo-3rq.jpg',
        'http://api.everythinginall.com/wp-content/uploads/2019/01/iwkjv_nhhoy.jpg',
        'http://api.everythinginall.com/wp-content/uploads/2019/01/7wvyvcxz0ci.jpg',
        'http://api.everythinginall.com/wp-content/uploads/2019/01/xenwvy2iam4.jpg',
        'http://api.everythinginall.com/wp-content/uploads/2019/01/ftvqiq9rdfi.jpg',
        'http://api.everythinginall.com/wp-content/uploads/2019/01/frunwjolvna.jpg',
        'http://api.everythinginall.com/wp-content/uploads/2019/01/dohjtfxjzfw.jpg',
        'http://api.everythinginall.com/wp-content/uploads/2019/01/ie_a91zks5e.jpg',
        'http://api.everythinginall.com/wp-content/uploads/2019/01/_gwsw5nzxmm.jpg',
        'http://api.everythinginall.com/wp-content/uploads/2019/01/i66kjife84g.jpg',
        // music
        // 'http://api.everythinginall.com/wp-content/uploads/2019/01/z9z6u1rn7sy.jpg',
        // 'http://api.everythinginall.com/wp-content/uploads/2019/01/mel-jjnm7rq.jpg',
        // spiral
        'http://api.everythinginall.com/wp-content/uploads/2019/01/l6g30jaq5tc.jpg',
        'http://api.everythinginall.com/wp-content/uploads/2019/01/am0mz34mgiy.jpg',
        'http://api.everythinginall.com/wp-content/uploads/2019/01/j0g8taxhza0.jpg',
        'http://api.everythinginall.com/wp-content/uploads/2019/01/udvxj95yqt8.jpg',
        'http://api.everythinginall.com/wp-content/uploads/2019/01/w_k6j6oqbdg.jpg'
    ]

    return pics[Math.floor(Math.random()*pics.length)];
};