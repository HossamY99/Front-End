
export function saveMap(Dict) {
    localStorage.setItem("SavedDict", JSON.stringify(Array.from(Dict.entries())));
   }
   export function getMap() {
    return localStorage.getItem("SavedDict");
   }
   