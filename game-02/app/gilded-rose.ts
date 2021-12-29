export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

export class GildedRose {
    items: Array<Item>;

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    /* solo agrego la funcionalidad faltante
    updateQuality() {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].name != 'Aged Brie' && this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
                if (this.items[i].quality > 0) {
                    if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
                        this.items[i].quality = this.items[i].quality - 1
                    }
                }
            } else {
                if (this.items[i].quality < 50) {
                    this.items[i].quality = this.items[i].quality + 1
                    if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
                        if (this.items[i].sellIn < 11) {
                            if (this.items[i].quality < 50) {
                                this.items[i].quality = this.items[i].quality + 1
                            }
                        }
                        if (this.items[i].sellIn < 6) {
                            if (this.items[i].quality < 50) {
                                this.items[i].quality = this.items[i].quality + 1
                            }
                        }
                    }
                }
            }
            if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
                this.items[i].sellIn = this.items[i].sellIn - 1;
            }
            if (this.items[i].sellIn < 0) {
                if (this.items[i].name != 'Aged Brie') {
                    if (this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
                        if (this.items[i].quality > 0) {
                            if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
                                this.items[i].quality = this.items[i].quality - 1
                            }
                        }
                    } else {
                        this.items[i].quality = this.items[i].quality - this.items[i].quality
                    }
                } else {
                    if (this.items[i].quality < 50) {
                        this.items[i].quality = this.items[i].quality + 1
                    }
                }
            }
        }

        if (this.items[i].name.indexOf('Conjured') !== -1 ) {
            if (this.items[i].name.indexOf('Aged Brie') == -1  && this.items[i].name.indexOf('Backstage passes to a TAFKAL80ETC concert') == -1) {
                if (this.items[i].quality > 0) {
                    if (this.items[i].name.indexOf('Sulfuras, Hand of Ragnaros') == -1) {
                        this.items[i].quality = this.items[i].quality - 1
                        if (this.items[i].sellIn < 0) {
                            this.items[i].quality = this.items[i].quality - 1
                        }
                    }
                }
            }
        }

        return this.items;
    }
    */

    /* codigo refactorizado */
    updateQuality() {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].name.indexOf('Conjured') == -1) { /* revisa si es conjurado supongo que se lo incluye en el nombre */
                if (this.items[i].quality > 0) {
                    switch (this.items[i].name) { /* casos no conjurados */
                        case 'Aged Brie':
                            if (this.items[i].quality < 50) {
                                this.items[i].quality = this.items[i].quality + 1
                            }
                            break;
                        case 'Backstage passes to a TAFKAL80ETC concert':
                            if (this.items[i].sellIn < 0 ) {
                                this.items[i].quality = 0
                            }
                            if (this.items[i].sellIn < 6 ) {
                                this.items[i].quality = this.items[i].quality + 3
                            } else if (this.items[i].sellIn < 11 ) {
                                this.items[i].quality = this.items[i].quality + 2                                
                            } else {
                                this.items[i].quality = this.items[i].quality + 1                                
                            }

                            break;
                        case 'Sulfuras, Hand of Ragnaros':
                            this.items[i].quality = 80
                            break;
                        default:
                            if (this.items[i].sellIn >= 0) {
                                this.items[i].quality = this.items[i].quality - 1
                            } else {
                                this.items[i].quality = this.items[i].quality - 2
                            }

                        
                    }
                }

            } else { /* casos conjurados, solo evalua los items que se degradan */
                if (this.items[i].name.indexOf('Sulfuras, Hand of Ragnaros') == -1 && this.items[i].name.indexOf('Aged Brie') == -1 && this.items[i].name.indexOf('Backstage passes to a TAFKAL80ETC concert') == -1) {
                    if (this.items[i].sellIn >= 0) {
                        this.items[i].quality = this.items[i].quality - 2
                    } else {
                        this.items[i].quality = this.items[i].quality - 4
                    }    
                } else {
                    if (this.items[i].name.indexOf('Aged Brie') !== -1 ) {
                        if (this.items[i].quality < 50) {
                            this.items[i].quality = this.items[i].quality + 1
                        }
                    } else if (this.items[i].name.indexOf('Backstage passes to a TAFKAL80ETC concert') !== -1 ) {
                        if (this.items[i].sellIn < 0 ) {
                            this.items[i].quality = 0
                        }
                        if (this.items[i].sellIn < 6 ) {
                            this.items[i].quality = this.items[i].quality + 3
                        } else if (this.items[i].sellIn < 11 ) {
                            this.items[i].quality = this.items[i].quality + 2                                
                        } else {
                            this.items[i].quality = this.items[i].quality + 1                                
                        }

                    } else  if (this.items[i].name.indexOf('Sulfuras, Hand of Ragnaros') !== -1) {
                        this.items[i].quality = 80
                    }
                    
                }
            }
            if this.items[i].name.indexOf('Sulfuras, Hand of Ragnaros') == -1){ /* revisa el maximo y el minino de calidad, excluye Sulfuras */
                if (this.items[i].quality > 50) {
                    this.items[i].quality = 50
                }
                if (this.items[i].quality < 0) {
                    this.items[i].quality = 0
                }
            }
        }
        return this.items;
    }

}
