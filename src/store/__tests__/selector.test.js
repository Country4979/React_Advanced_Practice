import { getAdvertById, getAdverts } from '../selectors';

describe('Testing React Redux Selectors getAdverts & getAdvertsById', () => {
    //Test state and expected objects before each test
    let state;
    const objectsArray = [
        {
            id: 1,
            name: 'advert 1',
        },
        {
            id: 2,
            name: 'advert 2',
        },
    ];

    beforeEach(() => {
        state = {
            auth: false,
            adverts: {
                areLoaded: false,
                data: objectsArray,
            },
        };
    });

    test('"getAdverts" selector returns an array with 2 advert objects', () => {
        expect(getAdverts(state)).toEqual(objectsArray);
    });

    describe('"getAdvertById" selector test', () => {
        //!= Test cases
        const testCases = [
            [1, objectsArray[0]],
            [2, objectsArray[1]],
        ];
        //Iterating about test cases.
        test.each(testCases)(
            'should return the advert object with the specify id',
            (id, expected) => {
                expect(getAdvertById(id)(state)).toEqual(expected);
            }
        );
    });
});
