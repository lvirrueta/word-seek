"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
let AppService = class AppService {
    resolveWordSearch(data) {
        return this.troughWordSearch(data, this.compare.bind(this));
    }
    troughWordSearch(data, callback) {
        const { wordSearch, words2find } = data;
        const row = wordSearch.length;
        const col = wordSearch[0].length;
        const res = [];
        for (let r = 0; r < row; r++) {
            for (let c = 0; c < col; c++) {
                words2find.forEach((word) => {
                    const location = { row: r, col: c };
                    const resCallback = callback({ location, word, wordSearch });
                    if (resCallback) {
                        res.push(resCallback);
                    }
                });
            }
        }
        return res;
    }
    compare(data) {
        const { location, word, wordSearch } = data;
        const { row, col } = location;
        if (wordSearch[row][col].toLowerCase() === word[0].toLowerCase()) {
            const res = this.startSearching(data);
            return this.debugResolution(res, word);
        }
    }
    debugResolution(resArr, word) {
        const res = resArr.reverse().filter((res, i) => {
            if (word.length === resArr.length) {
                return {
                    letter: res.letter,
                    location: res.location,
                };
            }
        });
        res.slice(0, -1).forEach((r, i) => {
            const uuidParents = [];
            r.location.forEach((loc) => {
                console.log(`letter: ${r.letter} =>`, loc);
                uuidParents.push(loc.uuidParent);
            });
            console.log('==== comparasion ====');
            uuidParents.forEach((uuidParent) => {
                res[i + 1].location.forEach((loc, iloc) => {
                    if (uuidParent) {
                        if (uuidParent.includes(loc.uuid)) {
                            console.log('este esta cool');
                            console.log(`letter: ${res[i + 1].letter} =>`);
                            console.log(`             loc 2 compare ->`, { loc });
                        }
                        else {
                            console.log('este hay que eliminarlo alv');
                            console.log(`letter: ${res[i + 1].letter} =>`);
                            console.log(`             loc 2 compare ->`, { loc });
                            console.log(res[i + 1].location[iloc]);
                            res[i + 1].location.splice(iloc, 1);
                        }
                    }
                });
            });
            console.log('==== finish comparasion ====');
        });
        if (res.length === word.length) {
            return {
                word,
                solution: res.reverse(),
            };
        }
        else {
            return undefined;
        }
    }
    reduceDebugResolution(res) {
        return;
    }
    startSearching(data) {
        const { location, word, wordSearch } = data;
        const { row, col } = location;
        const letters = [...word];
        let res;
        let locationArr = [{ location: { col, row }, uuid: null }];
        const resArr = [{ letter: word[0], location: [{ location, uuid: null }] }];
        letters.slice(1).every((letter) => {
            locationArr.forEach((loc) => {
                const locAdj = this.setAdjRowCol(Object.assign(Object.assign({}, data), { location: { col: loc.location.col, row: loc.location.row } }));
                const locAdjUid = locAdj.map((locA) => {
                    return {
                        location: locA,
                        uuid: loc.uuid,
                    };
                });
                res = this.compareAdj({ word: letter, location: null, wordSearch }, locAdjUid);
            });
            if (res.location.length) {
                res.location.forEach((loc) => {
                });
                locationArr = res.location;
                resArr.push(res);
                return true;
            }
            else {
                return false;
            }
        });
        return resArr;
    }
    compareAdj(data, locAdj) {
        const { wordSearch, word } = data;
        const wordResolution = [];
        locAdj.forEach((loc) => {
            const { location, uuid } = loc;
            const { col, row } = location;
            if (wordSearch[row][col].toLowerCase() === word.toLowerCase()) {
                wordResolution.push({
                    location: { col, row },
                    uuid: (0, uuid_1.v4)(),
                    uuidParent: uuid,
                });
            }
        });
        return { letter: word, location: wordResolution };
    }
    setAdjRowCol(data) {
        const { location, wordSearch } = data;
        const { col, row } = location;
        const rowLength = wordSearch.length - 1;
        const colLength = wordSearch[0].length - 1;
        const colMin = col === 0 ? 0 : col - 1;
        const rowMin = row === 0 ? 0 : row - 1;
        const colMax = col === colLength ? colLength : col + 1;
        const rowMax = row === rowLength ? rowLength : row + 1;
        const locationAdj = [];
        for (let r = rowMin; r <= rowMax; r++) {
            for (let c = colMin; c <= colMax; c++) {
                if (!(r === row && c === col)) {
                    locationAdj.push({ row: r, col: c });
                }
            }
        }
        return locationAdj;
    }
};
AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map