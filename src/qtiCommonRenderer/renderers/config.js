/**
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; under version 2
 * of the License (non-upgradable).
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 *
 * Copyright (c) 2014 (original work) Open Assessment Technologies SA;
 */

import _ from 'lodash';
import context from 'context';
import themes from 'ui/themes';
import assetManagerFactory from 'taoItems/assets/manager';
import assetStrategies from 'taoItems/assets/strategies';
import module from 'module';
import portableAssetStrategy from 'taoQtiItem/portableElementRegistry/assetManager/portableAssetStrategy';

var itemThemes = themes.get('items');
var moduleConfig = module.config();

//Create asset manager stack
var assetManager = assetManagerFactory(
    [
        {
            name: 'theme',
            handle: function handleTheme(url) {
                if (
                    itemThemes &&
                    url.path &&
                    (url.path === itemThemes.base || _.contains(_.pluck(itemThemes.available, 'path'), url.path))
                ) {
                    return context.root_url + url.toString();
                }
            }
        },
        assetStrategies.taomedia,
        assetStrategies.external,
        assetStrategies.base64,
        assetStrategies.itemCssNoCache,
        assetStrategies.baseUrl,
        portableAssetStrategy
    ],
    { baseUrl: '' }
); //baseUrl is not predefined in the config, but should be set upon renderer instantiating

//renderers locations
var locations = {
    assessmentItem: 'taoQtiItem/qtiCommonRenderer/renderers/Item',
    _container: 'taoQtiItem/qtiCommonRenderer/renderers/Container',
    _simpleFeedbackRule: false,
    _tooltip: 'taoQtiItem/qtiCommonRenderer/renderers/Tooltip',
    stylesheet: 'taoQtiItem/qtiCommonRenderer/renderers/Stylesheet',
    outcomeDeclaration: false,
    responseDeclaration: false,
    responseProcessing: false,
    figure: 'taoQtiItem/qtiCommonRenderer/renderers/Figure',
    img: 'taoQtiItem/qtiCommonRenderer/renderers/Img',
    figcaption: 'taoQtiItem/qtiCommonRenderer/renderers/Figcaption',
    math: 'taoQtiItem/qtiCommonRenderer/renderers/Math',
    object: 'taoQtiItem/qtiCommonRenderer/renderers/Object',
    table: 'taoQtiItem/qtiCommonRenderer/renderers/Table',
    printedVariable: 'taoQtiItem/qtiCommonRenderer/renderers/PrintedVariable',
    rubricBlock: 'taoQtiItem/qtiCommonRenderer/renderers/RubricBlock',
    modalFeedback: 'taoQtiItem/qtiCommonRenderer/renderers/ModalFeedback',
    prompt: 'taoQtiItem/qtiCommonRenderer/renderers/interactions/Prompt',
    choiceInteraction: 'taoQtiItem/qtiCommonRenderer/renderers/interactions/ChoiceInteraction',
    extendedTextInteraction: 'taoQtiItem/qtiCommonRenderer/renderers/interactions/ExtendedTextInteraction',
    orderInteraction: 'taoQtiItem/qtiCommonRenderer/renderers/interactions/OrderInteraction',
    associateInteraction: 'taoQtiItem/qtiCommonRenderer/renderers/interactions/AssociateInteraction',
    matchInteraction: 'taoQtiItem/qtiCommonRenderer/renderers/interactions/MatchInteraction',
    textEntryInteraction: 'taoQtiItem/qtiCommonRenderer/renderers/interactions/TextEntryInteraction',
    sliderInteraction: 'taoQtiItem/qtiCommonRenderer/renderers/interactions/SliderInteraction',
    inlineChoiceInteraction: 'taoQtiItem/qtiCommonRenderer/renderers/interactions/InlineChoiceInteraction',
    'simpleChoice.choiceInteraction': 'taoQtiItem/qtiCommonRenderer/renderers/choices/SimpleChoice.ChoiceInteraction',
    'simpleChoice.orderInteraction': 'taoQtiItem/qtiCommonRenderer/renderers/choices/SimpleChoice.OrderInteraction',
    hottext: 'taoQtiItem/qtiCommonRenderer/renderers/choices/Hottext',
    gap: 'taoQtiItem/qtiCommonRenderer/renderers/choices/Gap',
    gapText: 'taoQtiItem/qtiCommonRenderer/renderers/choices/GapText',
    'simpleAssociableChoice.matchInteraction':
        'taoQtiItem/qtiCommonRenderer/renderers/choices/SimpleAssociableChoice.MatchInteraction',
    'simpleAssociableChoice.associateInteraction':
        'taoQtiItem/qtiCommonRenderer/renderers/choices/SimpleAssociableChoice.AssociateInteraction',
    inlineChoice: 'taoQtiItem/qtiCommonRenderer/renderers/choices/InlineChoice',
    hottextInteraction: 'taoQtiItem/qtiCommonRenderer/renderers/interactions/HottextInteraction',
    hotspotInteraction: 'taoQtiItem/qtiCommonRenderer/renderers/interactions/HotspotInteraction',
    hotspotChoice: false,
    gapMatchInteraction: 'taoQtiItem/qtiCommonRenderer/renderers/interactions/GapMatchInteraction',
    selectPointInteraction: 'taoQtiItem/qtiCommonRenderer/renderers/interactions/SelectPointInteraction',
    graphicOrderInteraction: 'taoQtiItem/qtiCommonRenderer/renderers/interactions/GraphicOrderInteraction',
    mediaInteraction: 'taoQtiItem/qtiCommonRenderer/renderers/interactions/MediaInteraction',
    uploadInteraction: 'taoQtiItem/qtiCommonRenderer/renderers/interactions/UploadInteraction',
    graphicGapMatchInteraction: 'taoQtiItem/qtiCommonRenderer/renderers/interactions/GraphicGapMatchInteraction',
    gapImg: 'taoQtiItem/qtiCommonRenderer/renderers/choices/GapImg',
    graphicAssociateInteraction: 'taoQtiItem/qtiCommonRenderer/renderers/interactions/GraphicAssociateInteraction',
    associableHotspot: false,
    customInteraction: 'taoQtiItem/qtiCommonRenderer/renderers/interactions/PortableCustomInteraction',
    infoControl: 'taoQtiItem/qtiCommonRenderer/renderers/PortableInfoControl',
    include: 'taoQtiItem/qtiCommonRenderer/renderers/Include',
    endAttemptInteraction: 'taoQtiItem/qtiCommonRenderer/renderers/interactions/EndAttemptInteraction'
};

export default {
    name: 'commonRenderer',
    locations: locations,
    options: {
        assetManager: assetManager,
        themes: itemThemes,
        enableDragAndDrop: {
            associate: !!moduleConfig.associateDragAndDrop,
            gapMatch: !!moduleConfig.gapMatchDragAndDrop,
            graphicGapMatch: !!moduleConfig.graphicGapMatchDragAndDrop,
            order: !!moduleConfig.orderDragAndDrop
        },
        messages: moduleConfig.messages
    }
};
