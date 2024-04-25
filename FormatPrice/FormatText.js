import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const LongContent = ({ content }) => {
    const [expanded, setExpanded] = useState(false);

    const isLongContent = (content) => {
        const words = content.split('');
        return words.length > 350;
    };

    const truncateContent = (content) => {
        const words = content.split('');
        return words.slice(0, 350).join('');
    };

    const handleToggleExpand = () => {
        setExpanded(!expanded);
    };

    return (
        <View >
            {isLongContent(content) ? (
                <View style={{ paddingRight: 5 }}>
                    <Text style={{lineHeight:23}}>{expanded ? content : truncateContent(content)}</Text>
                    <TouchableOpacity onPress={handleToggleExpand}>
                        <Text style={{ color: 'blue', fontWeight: '700' }}>{expanded ? 'Read less' : 'Read more'}</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <Text style={{ paddingRight: 5 }}>{content}</Text>
            )}
        </View>
    );
};

export default LongContent;
