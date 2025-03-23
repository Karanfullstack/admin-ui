const obje = {
    '{"key":"Size","priceType":"base"}': {
        Small: 12,
        Medium: 12,
        Large: 12,
    },
    '{"key":"Crust","priceType":"additional"}': {
        Thick: 12,
        Thin: 12,
        Slim: 12,
    },
};

const postdata = {
    priceConfiguration: {
        Size: {
            priceType: 'base',
            avialableOptions: {
                Small: 12,
                Medium: 12,
                Large: 12,
            },
        },
        Crust: {
            priceType: 'additional',
            avialableOptions: {
                Thick: 12,
                Thin: 12,
                Slim: 12,
            },
        },
    },
    attributes: [
        {
            name: 'isHit',
            value: true,
        },
    ],
};
