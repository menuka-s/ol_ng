import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment.dev';

import OlMap from 'ol/map';
import OlXYZ from 'ol/source/xyz';
import OlTileLayer from 'ol/layer/tile';
import OlView from 'ol/view';
import OlProj from 'ol/proj';
import OlFeature from 'ol/feature';
import OlPoint from 'ol/geom/point';
import OlVectorLayer from 'ol/layer/vector';
import OlVectorSource from 'ol/source/vector';

// import OlProg from 'ol/prog'

import * as ol from 'ol';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

    map: OlMap;
    source: OlXYZ;
    layer: OlTileLayer;
    view: OlView;

    vectorLayer: OlVectorLayer = new OlVectorLayer();

    vectorSource: OlVectorSource = new OlVectorSource({});

    constructor() { }

    ngOnInit() {
        this.source = new OlXYZ({
            // tslint:disable-next-line:max-line-length
            url: 'https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=' + environment.mapboxApi,
            wrapX: false
        });

        this.layer = new OlTileLayer({
            source: this.source
        });

        this.view = new OlView({
            center: OlProj.fromLonLat([0, 0]),
            zoom: 2,
        });

        this.vectorLayer = new OlVectorLayer({
            source: this.vectorSource
        });

        this.map = new OlMap({
            target: 'map',
            layers: [this.layer, this.vectorLayer],
            view: this.view
        });
    }

    plotPoint() {
        let newCoord = new OlPoint(OlProj.transform([50, 50], 'EPSG:4326', 'EPSG:3857'));
        this.vectorSource.addFeature(new OlFeature(newCoord));
    }

}
