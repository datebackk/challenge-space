export function JSONParse(object: any) {
    let json;
    try {
        json = JSON.parse(object)
    } catch (e) {
        console.log(e);
    }

    return json;
}
