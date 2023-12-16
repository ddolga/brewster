export const updateRelated = [
    {
        '$lookup': {
            'from': 'stuffs',
            'localField': 'basket.sourceId',
            'foreignField': '_id',
            'as': 'basket'
        }
    }, {
        '$unwind': {
            'path': '$basket'
        }
    }, {
        '$lookup': {
            'from': 'stuffs',
            'localField': 'coffee.sourceId',
            'foreignField': '_id',
            'as': 'coffee'
        }
    }, {
        '$unwind': {
            'path': '$coffee'
        }
    }
]