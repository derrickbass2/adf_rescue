"""
This module contains the
WebSocket handling for real-time updates.
"""

from flask_socketio import SocketIO, emit, join_room, leave_room
from typing import Dict, Any
from datetime import datetime, UTC
import json

socketio = SocketIO(cors_allowed_origins="*")

connected_clients: Dict[str, set] = {}


@socketio.on('connect')
def handle_connect():
    """Handle client connection."""
    try:
        auth_token = socketio.request.args.get('token')
        if not auth_token:
            return False

        # Verify token and get user info
        # Implementation depends on your auth system
        return True
    except Exception as e:
        print(f"Connection error: {str(e)}")
        return False


@socketio.on('subscribe')
def handle_subscribe(data: Dict[str, Any]):
    """Handle subscription to organization updates."""
    try:
        organization_id = data.get('organizationId')
        if not organization_id:
            return

        room = f"org_{organization_id}"
        join_room(room)

        if room not in connected_clients:
            connected_clients[room] = set()
        connected_clients[room].add(socketio.request.sid)

        emit('subscribed', {
            'status': 'success',
            'timestamp': datetime.now(UTC).isoformat()
        })
    except Exception as e:
        emit('error', {'message': str(e)})


@socketio.on('unsubscribe')
def handle_unsubscribe(data: Dict[str, Any]):
    """Handle unsubscription from organization updates."""
    try:
        organization_id = data.get('organizationId')
        if not organization_id:
            return

        room = f"org_{organization_id}"
        leave_room(room)

        if room in connected_clients:
            connected_clients[room].discard(socketio.request.sid)
            if not connected_clients[room]:
                del connected_clients[room]
    except Exception as e:
        emit('error', {'message': str(e)})


@socketio.on('disconnect')
def handle_disconnect():
    """Handle client disconnection."""
    for room in list(connected_clients.keys()):
        if socketio.request.sid in connected_clients[room]:
            connected_clients[room].discard(socketio.request.sid)
            if not connected_clients[room]:
                del connected_clients[room]


def emit_to_organization(organization_id: str, event: str, data: Dict[str, Any]):
    """Emit event to all clients subscribed to an organization."""
    room = f"org_{organization_id}"
    emit(event, data, room=room)


def broadcast_metric_update(organization_id: str, metric_data: Dict[str, Any]):
    """Broadcast metric update to organization subscribers."""
    emit_to_organization(
        organization_id,
        'METRIC_UPDATE',
        {
            'type': 'METRIC_UPDATE',
            'payload': metric_data,
            'timestamp': datetime.now(UTC).isoformat()
        }
    )


def broadcast_alert(organization_id: str, alert_data: Dict[str, Any]):
    """Broadcast alert to organization subscribers."""
    emit_to_organization(
        organization_id,
        'ALERT',
        {
            'type': 'ALERT',
            'payload': alert_data,
            'timestamp': datetime.now(UTC).isoformat()
        }
    )