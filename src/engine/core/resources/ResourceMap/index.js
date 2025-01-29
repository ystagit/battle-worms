import EventEmitter from '../../events/EventEmitter'
import MapEntry from './MapEntry'

class ResourceMap {

    constructor() {
        // Resource storage
        this.resourceMap = {}
        this.numberOfAssetsInProcess = 0
        this.eventEmitter = new EventEmitter()
    }

    registerAssetArray(assets) {
        assets.forEach((assetName) => {
            if (!this.isAssetRegistered(assetName)) {
                this.registerAsset(assetName)
            } else {
                this.incrementNumberOfAssets(assetName)
            }
        })
    }

    registerAssetGroup(assets) {
        assets.forEach((asset) => {
            const assetName = asset.name
            if (!this.isAssetRegistered(assetName)) {
                this.registerAsset(assetName)
            } else {
                this.incrementNumberOfAssets(assetName)
            }
        })
    }

    // Register one more resource to load
    registerAsset(name) {
        this.resourceMap[name] = new MapEntry()
        this.numberOfAssetsInProcess++
        console.log('Register asset: ' + name + ', numberOfAssetsInProcess: ' + this.numberOfAssetsInProcess);
    }

    completeAsset(name, asset) {
        if (this.isAssetRegistered(name)) {
            this.resourceMap[name].asset = asset
            this.numberOfAssetsInProcess--
            console.log('completeAsset: ' + name + ', numberOfAssetsInProcess: ' + this.numberOfAssetsInProcess);

            if (this.numberOfAssetsInProcess === 0) {
                this.eventEmitter.emit('ON_COMPLETED_LADING_ASSETS', null)
            }
        } else {
            console.warn('ResourceMap: ' + name + ' resource does not exist in map')
        }
    }

    incrementNumberOfAssets(name) {
        if (this.isAssetRegistered(name)) {
            this.resourceMap[name].count += 1
        } else {
            console.warn('ResourceMap: ' + name + ' resource does not exist in map')
        }
    }

    getAsset(name) { return this.isAssetLoaded(name) ? this.resourceMap[name].asset : null }

    removeAsset(name) {
        if (this.isAssetLoaded(name)) {
            this.resourceMap[name].count -= 1
            const { count } = this.resourceMap[name]
            if (count === 0) {
                delete this.resourceMap[name]
            }
        }
    }

    isAssetRegistered(name) { return (name in this.resourceMap) }
    isAssetLoaded(name) { return this.isAssetRegistered(name) && this.resourceMap[name].asset != null }
}

const resourceMap = new ResourceMap()
export default resourceMap