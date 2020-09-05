/*
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
 * Copyright (c) 2014-2017 (original work) Open Assessment Technologies SA (under the project TAO-PRODUCT);
 *
 */
import _ from 'lodash';
import { responseRules as responseRulesHelper } from 'taoQtiItem/qtiItem/helper/responseRules';

const _templateNames = {
    MATCH_CORRECT: 'http://www.imsglobal.org/question/qti_v2p1/rptemplates/match_correct',
    MAP_RESPONSE: 'http://www.imsglobal.org/question/qti_v2p1/rptemplates/map_response',
    MAP_RESPONSE_POINT: 'http://www.imsglobal.org/question/qti_v2p1/rptemplates/map_response_point',
    NONE: 'no_response_processing'
};


export default {
    isUsingTemplate(response, tpl) {
        if (_.isString(tpl)) {
            if (tpl === response.template || _templateNames[tpl] === response.template) {
                return true;
            }
        }

        return false;
    },
    isValidTemplateName(tplName) {
        return !!this.getTemplateUriFromName(tplName);
    },
    getTemplateUriFromName(tplName) {
        return _templateNames[tplName] || '';
    },
    getTemplateNameFromUri(tplUri) {
        let tplName = '';

        _.forIn(_templateNames, (uri, name) => {
            if (uri === tplUri) {
                tplName = name;
                return false;
            }
        });

        return tplName;
    },
    getTemplateNameFromResponseRules(responseIdentifier, responseRules) {
        if (!responseRules) {
            return 'NONE';
        }

        const {
            responseIf: {
                responseRules: [outcomeRules = {}] = [],
            } = {}
        } = responseRules;
        const {
            attributes: {
                identifier: outcomeIdentifier,
            } = {},
        } = outcomeRules;

        if (!outcomeRules) {
            return '';
        }

        return Object.keys(responseRulesHelper).find(
            (key) => _.isEqual(responseRules, responseRulesHelper[key](responseIdentifier, outcomeIdentifier))
        );
    }
};
