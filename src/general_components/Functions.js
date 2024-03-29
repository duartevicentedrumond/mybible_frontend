//function to convert date object to string
export function dateToString(date) {

    if (date !== null) {
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        date = year + "-" + month + "-" + day;
    }

    return date;

};

//function to get location
export function getLocation(
    [location, setLocation],
    [buildings, rooms, furnitures, sections, boxes, items],
    elementId,
    type
) {

    switch (type) {
        case 'building':

            const filteredBuilding = buildings.filter(building => {
                if (String(building.buildingId) === String(elementId)) {
                    return building;
                }
            })[0];

            setLocation(existingLocation => ({
                ...existingLocation,
                building: {
                    buildingId: filteredBuilding.buildingId,
                    name: filteredBuilding.name
                }
            }));

            break;

        case 'room':

            const filteredRoom = rooms.filter(room => {
                if (String(room.roomId) === String(elementId)) {
                    return room;
                }
            })[0];

            setLocation(existingLocation => ({
                ...existingLocation,
                room: {
                    roomId: filteredRoom.roomId,
                    name: filteredRoom.name
                }
            }));

            if (filteredRoom.building !== null) {
                getLocation(
                    [location, setLocation],
                    [buildings, rooms, furnitures, sections, boxes, items],
                    filteredRoom.building.buildingId,
                    "building"
                )
            };

            break;

        case 'furniture':

            const filteredFurniture = furnitures.filter(furniture => {
                if (String(furniture.furnitureId) === String(elementId)) {
                    return furniture;
                }
            })[0];

            setLocation(existingLocation => ({
                ...existingLocation,
                furniture: {
                    furnitureId: filteredFurniture.furnitureId,
                    name: filteredFurniture.name
                }
            }));

            if (filteredFurniture.room !== null) {
                getLocation(
                    [location, setLocation],
                    [buildings, rooms, furnitures, sections, boxes, items],
                    filteredFurniture.room.roomId,
                    "room"
                )
            } else if (filteredFurniture.building !== null) {
                getLocation(
                    [location, setLocation],
                    [buildings, rooms, furnitures, sections, boxes, items],
                    filteredFurniture.building.buildingId,
                    "building"
                )
            };

            break;

        case 'section':

            const filteredSection = sections.filter(section => {
                if (String(section.sectionId) === String(elementId)) {
                    return section;
                }
            })[0];

            setLocation(existingLocation => ({
                ...existingLocation,
                section: {
                    sectionId: filteredSection.sectionId,
                    name: filteredSection.name
                }
            }));

            if (filteredSection.furniture !== null) {
                getLocation(
                    [location, setLocation],
                    [buildings, rooms, furnitures, sections, boxes, items],
                    filteredSection.furniture.furnitureId,
                    "furniture"
                )
            } else if (filteredSection.room !== null) {
                getLocation(
                    [location, setLocation],
                    [buildings, rooms, furnitures, sections, boxes, items],
                    filteredSection.room.roomId,
                    "room"
                )
            } else if (filteredSection.building !== null) {
                getLocation(
                    [location, setLocation],
                    [buildings, rooms, furnitures, sections, boxes, items],
                    filteredSection.building.buildingId,
                    "building"
                )
            };

            break;

        case 'box':

            const filteredBox = boxes.filter(box => {
                if (String(box.boxId) === String(elementId)) {
                    return box;
                }
            })[0];

            setLocation(existingLocation => ({
                ...existingLocation,
                box: {
                    boxId: filteredBox.boxId,
                    name: filteredBox.name
                }
            }));

            if (filteredBox.section !== null) {
                getLocation(
                    [location, setLocation],
                    [buildings, rooms, furnitures, sections, boxes, items],
                    filteredBox.section.sectionId,
                    "section"
                )
            } else if (filteredBox.furniture !== null) {
                getLocation(
                    [location, setLocation],
                    [buildings, rooms, furnitures, sections, boxes, items],
                    filteredBox.furniture.furnitureId,
                    "furniture"
                )
            } else if (filteredBox.room !== null) {
                getLocation(
                    [location, setLocation],
                    [buildings, rooms, furnitures, sections, boxes, items],
                    filteredBox.room.roomId,
                    "room"
                )
            } else if (filteredBox.building !== null) {
                getLocation(
                    [location, setLocation],
                    [buildings, rooms, furnitures, sections, boxes, items],
                    filteredBox.building.buildingId,
                    "building"
                )
            };

            break;

        case 'item':

            const filteredItem = items.filter(item => {
                if (String(item.itemId) === String(elementId)) {
                    return item;
                }
            })[0];

            setLocation(existingLocation => ({
                ...existingLocation,
                item: {
                    itemId: filteredItem.itemId,
                    name: filteredItem.name
                }
            }));

            if (filteredItem.box !== null) {
                getLocation(
                    [location, setLocation],
                    [buildings, rooms, furnitures, sections, boxes, items],
                    filteredItem.box.boxId,
                    "box"
                )
            } else if (filteredItem.section !== null) {
                getLocation(
                    [location, setLocation],
                    [buildings, rooms, furnitures, sections, boxes, items],
                    filteredItem.section.sectionId,
                    "section"
                )
            } else if (filteredItem.furniture !== null) {
                getLocation(
                    [location, setLocation],
                    [buildings, rooms, furnitures, sections, boxes, items],
                    filteredItem.furniture.furnitureId,
                    "furniture"
                )
            } else if (filteredItem.room !== null) {
                getLocation(
                    [location, setLocation],
                    [buildings, rooms, furnitures, sections, boxes, items],
                    filteredItem.room.roomId,
                    "room"
                )
            } else if (filteredItem.building !== null) {
                getLocation(
                    [location, setLocation],
                    [buildings, rooms, furnitures, sections, boxes, items],
                    filteredItem.building.buildingId,
                    "building"
                )
            };

            break;

        default:
            break;
    }
}; 